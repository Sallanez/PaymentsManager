using Newtonsoft.Json;

namespace PaymentsManager.WebApi.Models.ApiResponse;

public class ApiPaymentRecordsResponse
{
    public Guid Id { get; set; }
    public string FullName { get; set; }
    public string EmployeeCode { get; set; }
    public string SpreadSheetDate { get; set; }
    public decimal IsssDiscountRate { get; set; }
    public decimal AfpDiscountRate { get; set; }
    public decimal RentDiscountRate { get; set; }
    public decimal NetSalary { get; set; }
    public Guid SpreedSheetFileId { get; set; }
}
