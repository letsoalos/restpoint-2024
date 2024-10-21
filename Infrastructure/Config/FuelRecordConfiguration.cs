using Core.Enteties;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Infrastructure.Config;

public class FuelRecordConfiguration : IEntityTypeConfiguration<FuelRecord>
{
    public void Configure(EntityTypeBuilder<FuelRecord> builder)
    {
        builder.Property(x => x.FuelStation).HasMaxLength(100);
        builder.Property(x => x.FuelAmount).HasColumnType("decimal(18,2)");
        builder.HasOne(x => x.Vehicle)
               .WithMany()
               .HasForeignKey(x => x.VehicleId)
               .OnDelete(DeleteBehavior.NoAction);
    }
}
