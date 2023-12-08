namespace PaymentsManager.WebApi.Models.DTOs.Blob;

public class SpreedSheetPaymentDTO
{
    public string EmployeeCode { get; set; }
    public string Name { get; set; }
    public DateTime Date { get; set; }
    public decimal IsssDiscountRate { get; set; }
    public decimal AfpDiscountRate { get; set; }
    public decimal RentDiscountRate { get; set; }
    public decimal NetSalary { get; set; }
}
