using System.Net;

namespace PaymentsManager.WebApi.Models.ApiResponse;

public class ApiResponse
{
    public ApiResponse()
    {
        ErrorMessages = new List<string>();
    }

    public HttpStatusCode StatusCode { get; set; }
    public bool IsSuccess { get; set; } = true;
    public List<string> ErrorMessages { get; set; }
    public object Result { get; set; }
}
