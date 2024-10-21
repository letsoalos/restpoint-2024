using Core.Enteties;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Infrastructure.Config;

public class ClientPremiumConfiguration : IEntityTypeConfiguration<ClientPremium>
{
       public void Configure(EntityTypeBuilder<ClientPremium> builder)
       {
              builder.Property(x => x.TotalAmountPaid).HasColumnType("decimal(18,2)");
              builder.HasOne(x => x.Client)
                     .WithMany()
                     .HasForeignKey(x => x.ClientId)
                     .OnDelete(DeleteBehavior.NoAction);
              builder.HasOne(x => x.PremiumPlan)
                     .WithMany()
                     .HasForeignKey(x => x.PremiumPlanId)
                     .OnDelete(DeleteBehavior.NoAction);
              builder.HasOne(x => x.PaymentFrequency)
                     .WithMany()
                     .HasForeignKey(x => x.PaymentFrequencyId)
                     .OnDelete(DeleteBehavior.NoAction);
       }
}
