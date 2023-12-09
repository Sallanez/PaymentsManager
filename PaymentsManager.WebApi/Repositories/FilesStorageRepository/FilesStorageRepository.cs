using Azure.Storage;
using Azure.Storage.Blobs;
using CsvHelper;
using Microsoft.EntityFrameworkCore;
using PaymentsManager.Data;
using PaymentsManager.WebApi.Data;
using PaymentsManager.WebApi.Models.ApiResponse;
using PaymentsManager.WebApi.Models.Domain;
using PaymentsManager.WebApi.Models.DTOs.Blob;
using System.Globalization;

namespace PaymentsManager.WebApi.Repositories.FilesStorage;

public class FilesStorageRepository : IFIlesStorageRepository
{
    private readonly string storageAccount;
    private readonly string storageKey;
    private readonly BlobContainerClient filesContainer;
    private readonly AuthDbContext authDbContext;
    private readonly PaymentsManagerDbContext paymentsManagerDbContext;
    private ApiBlobResponse apiBlobResponse;

    public FilesStorageRepository(IConfiguration configuration, AuthDbContext authDbContext, PaymentsManagerDbContext paymentsManagerDbContext)
    {
        storageAccount = configuration.GetSection("AzureCredentials")["StorageAccount"]!;
        storageKey = configuration.GetSection("AzureCredentials")["StorageKey"]!;
        
        var credential = new StorageSharedKeyCredential(storageAccount, storageKey);
        var blobUri = new Uri($"https://{storageAccount}.blob.core.windows.net/");
        var blobServiceClient = new BlobServiceClient(blobUri, credential);
        filesContainer = blobServiceClient.GetBlobContainerClient("spreedsheetfiles");
        apiBlobResponse = new ApiBlobResponse();
        this.authDbContext = authDbContext;
        this.paymentsManagerDbContext = paymentsManagerDbContext;
    }

    public async Task<ApiBlobResponse> UploadAsync(IFormFile file, string userId)
    {
       
       BlobClient client = filesContainer.GetBlobClient(file.FileName);
       await using (Stream? stream = file.OpenReadStream())
       {
            using var reader = new StreamReader(stream);
            using var csv = new CsvReader(reader, CultureInfo.InvariantCulture);
            var records = csv.GetRecords<SpreedSheetPaymentDTO>().ToList();

            var userIDs = await authDbContext.Users.Select(u => u.Id).ToListAsync();

            foreach (var record in records)
            {
                if (!userIDs.Contains(record.EmployeeCode))
                {
                    // Handle the validation error
                    Console.WriteLine($"EmployeeCode {record.EmployeeCode} does not match any user Id in the database.");
                }
                else
                {
                    Console.WriteLine($"EmployeeCode {record.EmployeeCode} is valid.");
                }
            }

            var spreedSheetFileId = Guid.NewGuid();

            var spreedSheetFile = new SpreedSheetFile
            {
                Id = spreedSheetFileId,
                FileName = file.FileName,
                FilePath = client.Uri.AbsoluteUri,
                UploadedAt = DateTime.Now,
                AdminId = userId,
            };

            List<PaymentRecord> paymentRecords = new(records.Count);

            foreach (var record in records)
            {
                var paymentRecord = new PaymentRecord
                {
                    Id = Guid.NewGuid(),
                    FullName = record.Name,
                    EmployeeCode = record.EmployeeCode,
                    SpreadSheetDate = record.Date,
                    IsssDiscountRate = record.IsssDiscountRate,
                    AfpDiscountRate = record.AfpDiscountRate,
                    RentDiscountRate = record.RentDiscountRate,
                    NetSalary = record.NetSalary,
                    SpreedSheetFileId = spreedSheetFileId,
                };
                paymentRecords.Add(paymentRecord);
            }

            paymentsManagerDbContext.SpreedSheetFiles.Add(spreedSheetFile);
            paymentsManagerDbContext.SaveChanges();
            paymentsManagerDbContext.PaymentRecords.AddRange(paymentRecords);
            paymentsManagerDbContext.SaveChanges();

            stream.Position = 0;
            await client.UploadAsync(stream, true);
       }
       apiBlobResponse.Blod.Uri = client.Uri.AbsoluteUri;
       apiBlobResponse.Blod.FileName = client.Name;
       apiBlobResponse.Status = $"File {file.FileName} uploaded successfully";
       return apiBlobResponse;
    }
    public async Task<List<ApiSpreedSheetFilesResponse>> ListContainersAsync()
    {
        var files = await paymentsManagerDbContext.SpreedSheetFiles.Select(f => new ApiSpreedSheetFilesResponse
        {
            Id = f.Id.ToString(),
            FileName = f.FileName,
            FilePath = f.FilePath,
            UploadedAt = f.UploadedAt.ToString("yyyy-MM-dd"),
        })
        .ToListAsync();

        return files;
    }

    public async Task DeleteSpreedSheetFileAndPaymentsRecordsAsync(Guid fileId)
    {    
        var spreadSheetFile = await paymentsManagerDbContext.SpreedSheetFiles.Include(s => s.PaymentRecords).FirstOrDefaultAsync(s => s.Id == fileId) ?? throw new InvalidOperationException("SpreadSheetFile not found.");

        // Remove the payment records associated with the file
        paymentsManagerDbContext.PaymentRecords.RemoveRange(spreadSheetFile.PaymentRecords);

        // Remove the SpreadSheetFile itself
        paymentsManagerDbContext.SpreedSheetFiles.Remove(spreadSheetFile);

        // Save the changes to the database
        await paymentsManagerDbContext.SaveChangesAsync();

        // Delete the file from the blob storage
        await filesContainer.DeleteBlobIfExistsAsync(spreadSheetFile.FileName);
    }
    public async Task<ApiSpreedSheetFilesResponse> GetSpreedSheetExampleAsync()
    {
        string exampleFilePath = "Example/payment_example.csv";

        try
        {
            // Get the blob client for the example file
            BlobClient blobClient = filesContainer.GetBlobClient(exampleFilePath);

            // Check if the blob exists
            if (await blobClient.ExistsAsync())
            {
                var blobDownloadInfo = await blobClient.DownloadAsync();

                using var streamReader = new StreamReader(blobDownloadInfo.Value.Content);
                string content = await streamReader.ReadToEndAsync();

                return new ApiSpreedSheetFilesResponse
                {
                    Id = "123",
                    FileName = exampleFilePath,
                    FilePath = blobClient.Uri.AbsoluteUri,
                    UploadedAt = DateTime.Now.ToString("yyyy-MM-dd")
                };
            }
            else
            {
                throw new FileNotFoundException("The example spreadsheet file was not found in the storage.");
            }
        }
        catch (Exception ex)
        {
            // Handle any exceptions that may occur
            throw new InvalidOperationException("Error retrieving the example spreadsheet file.", ex);
        }
    }
}
