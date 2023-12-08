using Microsoft.EntityFrameworkCore;
using PaymentsManager.WebApi.Data;
using PaymentsManager.WebApi.Models.Domain;

namespace PaymentsManager.WebApi.Repositories.PaymentRecordsRepository;

public class PaymentRecordsRepository : IPaymentRecordsRepository
{
    private readonly PaymentsManagerDbContext paymentsManagerDbContext;

    public PaymentRecordsRepository(PaymentsManagerDbContext paymentsManagerDbContext)
    {
        this.paymentsManagerDbContext = paymentsManagerDbContext;
    }

    public async Task<List<PaymentRecord>> GetPaymentRecordsAsync(Guid userId)
    {
        var paymentRecords = await paymentsManagerDbContext.PaymentRecords.Where(p => p.EmployeeCode == userId.ToString()).ToListAsync();
        return paymentRecords;
    }
}
