using Core.Enteties;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Infrastructure.Config;

public class PaymentConfiguration : IEntityTypeConfiguration<Payment>
{
    public void Configure(EntityTypeBuilder<Payment> builder)
    {
        builder.Property(x => x.TransactionId).HasMaxLength(100);
        builder.Property(x => x.InvoiceNumber).HasMaxLength(100);
        builder.Property(x => x.AmountPaid).HasColumnType("decimal(18,2)");
    }
}
