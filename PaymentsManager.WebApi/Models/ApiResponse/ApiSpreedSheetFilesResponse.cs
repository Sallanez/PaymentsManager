namespace PaymentsManager.WebApi.Models.ApiResponse;

public class ApiSpreedSheetFilesResponse
{
    public string Id { get; set; }
    public string FileName { get; set; }
    public string FilePath { get; set; }
    public DateTime UploadedAt { get; set; }
}
