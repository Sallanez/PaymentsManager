namespace PaymentsManager.WebApi.Models.Domain;

public class SpreedSheetFile
{
    public Guid Id { get; set; }
    public string FileName { get; set; }
    public string FilePath { get; set; }
    public DateTime UploadedAt { get; set; }
    public string AdminId { get; set; }
    public ICollection<PaymentRecord> PaymentRecords { get; set; }
}
