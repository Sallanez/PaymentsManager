using PaymentsManager.WebApi.Models.Domain;

namespace PaymentsManager.WebApi.Repositories.PaymentRecordsRepository;

public interface IPaymentRecordsRepository
{
    Task<List<PaymentRecord>> GetPaymentRecordsAsync(Guid userId);
}
