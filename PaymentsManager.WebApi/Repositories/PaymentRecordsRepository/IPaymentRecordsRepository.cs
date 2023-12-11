using PaymentsManager.WebApi.Models.ApiResponse;

namespace PaymentsManager.WebApi.Repositories.PaymentRecordsRepository;

public interface IPaymentRecordsRepository
{
    Task<List<ApiPaymentRecordsResponse>> GetPaymentRecordsAsync(Guid userId);
}
