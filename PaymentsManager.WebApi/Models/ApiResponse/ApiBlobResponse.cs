using PaymentsManager.WebApi.Models.DTOs.Blod;

namespace PaymentsManager.WebApi.Models.ApiResponse;

public class ApiBlobResponse
{
    public ApiBlobResponse()
    {
        Blod = new ApiSpreedSheetFilesResponse();
    }
    public string? Status { get; set; }
    public bool Error { get; set; }
    public ApiSpreedSheetFilesResponse Blod { get; set; }
}
