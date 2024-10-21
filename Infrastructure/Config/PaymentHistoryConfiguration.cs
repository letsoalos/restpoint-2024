using Core.Enteties;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Infrastructure.Config;

public class PaymentHistoryConfiguration : IEntityTypeConfiguration<PaymentHistory>
{
    public void Configure(EntityTypeBuilder<PaymentHistory> builder)
    {
        builder.Property(x => x.ReferenceNumber).HasMaxLength(100);
        builder.Property(x => x.Description).HasMaxLength(100);
        builder.Property(x => x.TotalAmountPaid).HasColumnType("decimal(18,2)");
        builder.HasOne(x => x.Client)
               .WithMany()
               .HasForeignKey(x => x.ClientId)
               .OnDelete(DeleteBehavior.NoAction);
        builder.HasOne(x => x.PaymentMethod)
               .WithMany()
               .HasForeignKey(x => x.PaymentMethodId)
               .OnDelete(DeleteBehavior.NoAction);
        builder.HasOne(x => x.Status)
               .WithMany()
               .HasForeignKey(x => x.StatusId)
               .OnDelete(DeleteBehavior.NoAction);
    }
}
