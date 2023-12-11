using Microsoft.EntityFrameworkCore;
using PaymentsManager.WebApi.Data;
using PaymentsManager.WebApi.Models.ApiResponse;
using PaymentsManager.WebApi.Models.Domain;

namespace PaymentsManager.WebApi.Repositories.PaymentRecordsRepository;

public class PaymentRecordsRepository : IPaymentRecordsRepository
{
    private readonly PaymentsManagerDbContext paymentsManagerDbContext;

    public PaymentRecordsRepository(PaymentsManagerDbContext paymentsManagerDbContext)
    {
        this.paymentsManagerDbContext = paymentsManagerDbContext;
    }

    public async Task<List<ApiPaymentRecordsResponse>> GetPaymentRecordsAsync(Guid userId)
    {
        var paymentRecords = await paymentsManagerDbContext.PaymentRecords.Where(p => p.EmployeeCode == userId.ToString()).ToListAsync();
        var paymentRecordsDto = paymentRecords.Select(p => new ApiPaymentRecordsResponse
        {
            Id = p.Id,
            FullName = p.FullName,
            EmployeeCode = p.EmployeeCode,
            SpreadSheetDate = p.SpreadSheetDate.ToString("yyyy-MM-dd"),
            IsssDiscountRate = p.IsssDiscountRate,
            AfpDiscountRate = p.AfpDiscountRate,
            RentDiscountRate = p.RentDiscountRate,
            NetSalary = p.NetSalary,
            SpreedSheetFileId = p.SpreedSheetFileId
        }).ToList();
        return paymentRecordsDto;
    }
}
