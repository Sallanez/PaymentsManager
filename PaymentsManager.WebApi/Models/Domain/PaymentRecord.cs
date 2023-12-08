namespace PaymentsManager.WebApi.Models.Domain;

public class PaymentRecord
{
    public Guid Id { get; set; }
    public string FullName { get; set; }
    public string EmployeeCode { get; set; }
    public DateTime SpreadSheetDate { get; set; }
    public decimal IsssDiscountRate { get; set; }
    public decimal AfpDiscountRate { get; set; }
    public decimal RentDiscountRate { get; set; }
    public decimal NetSalary { get; set; }
    public Guid SpreedSheetFileId { get; set; }
}
