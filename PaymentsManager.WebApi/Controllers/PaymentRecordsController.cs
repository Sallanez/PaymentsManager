using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using PaymentsManager.WebApi.Repositories.PaymentRecordsRepository;

namespace PaymentsManager.WebApi.Controllers;

[Authorize(Roles="User")]
[Route("api/payments")]
[ApiController]
public class PaymentRecordsController : ControllerBase
{
    private readonly IPaymentRecordsRepository paymentRecordsRepository;

    public PaymentRecordsController(IPaymentRecordsRepository paymentRecordsRepository)
    {
        this.paymentRecordsRepository = paymentRecordsRepository;
    }

    [HttpGet]
    public async Task<IActionResult> GetPaymentsRecords()
    {
        Guid userId = Guid.Parse(HttpContext.User.Claims.FirstOrDefault(c => c.Type == "id")?.Value!);
        var paymentRecords = await paymentRecordsRepository.GetPaymentRecordsAsync(userId);
        return Ok(paymentRecords);
    }
}
