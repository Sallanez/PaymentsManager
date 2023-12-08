using Microsoft.AspNetCore.Http;
using PaymentsManager.WebApi.Models.ApiResponse;
using PaymentsManager.WebApi.Models.Domain;

namespace PaymentsManager.WebApi.Repositories.FilesStorage;

public interface IFIlesStorageRepository
{
    Task<ApiBlobResponse> UploadAsync(IFormFile file,string userId);
    Task<List<ApiSpreedSheetFilesResponse>> ListContainersAsync();
    Task DeleteSpreedSheetFileAndPaymentsRecordsAsync(Guid fileId);
    Task<ApiSpreedSheetFilesResponse> GetSpreedSheetExampleAsync();
}
