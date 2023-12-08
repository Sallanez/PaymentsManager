using Microsoft.EntityFrameworkCore;
using PaymentsManager.WebApi.Models.Domain;

namespace PaymentsManager.WebApi.Data;

public class PaymentsManagerDbContext : DbContext
{
    public PaymentsManagerDbContext(DbContextOptions<PaymentsManagerDbContext> options) : base(options)
    {}
    public DbSet<SpreedSheetFile> SpreedSheetFiles { get; set; }
    public DbSet<PaymentRecord> PaymentRecords { get; set; }
    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.Entity<PaymentRecord>().Property(p => p.IsssDiscountRate).HasColumnType("decimal(18, 2)");
        modelBuilder.Entity<PaymentRecord>().Property(p => p.AfpDiscountRate).HasColumnType("decimal(18, 2)");
        modelBuilder.Entity<PaymentRecord>().Property(p => p.RentDiscountRate).HasColumnType("decimal(18, 2)");
        modelBuilder.Entity<PaymentRecord>().Property(p => p.NetSalary).HasColumnType("decimal(18, 2)");
    }
}
