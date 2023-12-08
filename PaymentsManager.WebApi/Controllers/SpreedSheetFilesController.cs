using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using PaymentsManager.WebApi.Repositories.FilesStorage;
using System.Security.Claims;

namespace PaymentsManager.WebApi.Controllers;

[Authorize(Roles = "Admin")]
[Route("api/files")]
[ApiController]
public class SpreedSheetFilesController : ControllerBase
{
    private readonly IFIlesStorageRepository filesStorage;

    public SpreedSheetFilesController(IFIlesStorageRepository filesStorage)
    {
        this.filesStorage = filesStorage;
    }

    [HttpPost]
    public async Task<IActionResult> UploadFileAsync(IFormFile file)
    {
        string userId = HttpContext.User.Claims.FirstOrDefault(c => c.Type == "id")?.Value!;
        var response = await filesStorage.UploadAsync(file, userId);
        return Ok(response);
    }
    [HttpGet("list")]
    public async Task<IActionResult> ListContainersAsync()
    {
        var filesRecords = await filesStorage.ListContainersAsync();
        return Ok(filesRecords);
    }
    [HttpGet("example")]
    public async Task<IActionResult> GetSpreedSheetExample()
    {
        var filesRecord = await filesStorage.GetSpreedSheetExampleAsync();
        return Ok(filesRecord);
    }
    [HttpDelete]
    [Route("{fileId}")]
    public async Task<IActionResult> DeleteFileAndPaymentsRecordsAsync([FromRoute] Guid fileId)
    {
        await filesStorage.DeleteSpreedSheetFileAndPaymentsRecordsAsync(fileId);
        return Ok();
    }
}
