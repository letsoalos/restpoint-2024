using Core.Enteties;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Infrastructure.Config;

public class IncidentRecordConfiguration : IEntityTypeConfiguration<IncidentRecord>
{
    public void Configure(EntityTypeBuilder<IncidentRecord> builder)
    {
        builder.Property(x => x.Description).HasMaxLength(100);
        builder.Property(x => x.DamageAssesment).HasMaxLength(255);
        builder.Property(x => x.InsuranceClaimNumber).HasMaxLength(100);
        builder.HasOne(x => x.Vehicle)
               .WithMany()
               .HasForeignKey(x => x.VehicleId)
               .OnDelete(DeleteBehavior.NoAction);
        builder.HasOne(x => x.Status)
               .WithMany()
               .HasForeignKey(x => x.StatusId)
               .OnDelete(DeleteBehavior.NoAction);
    }
}
