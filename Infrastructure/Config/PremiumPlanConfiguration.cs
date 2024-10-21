using Core.Enteties._LookUps;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Infrastructure.Config;

public class PremiumPlanConfiguration : IEntityTypeConfiguration<PremiumPlan>
{
    public void Configure(EntityTypeBuilder<PremiumPlan> builder)
    {
        builder.Property(x => x.Name).HasMaxLength(255);
        builder.Property(x => x.Description).HasMaxLength(255);
        builder.Property(x => x.Amount).HasColumnType("decimal(18,2)");
        builder.Property(x => x.CoverAmount).HasColumnType("decimal(18,2)");
    }
}
