using Core.Enteties;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Infrastructure.Config;

public class VehicleMaintenanceConfiguration : IEntityTypeConfiguration<VehicleMaintenance>
{
    public void Configure(EntityTypeBuilder<VehicleMaintenance> builder)
    {
        builder.Property(x => x.ServiceCost).HasColumnType("decimal(18,2)");
        builder.Property(x => x.ServiceProvider).HasMaxLength(50);
        builder.Property(x => x.Notes).HasMaxLength(50);
        builder.HasOne(x => x.Vehiclehicle)
               .WithMany()
               .HasForeignKey(x => x.VehicleId)
               .OnDelete(DeleteBehavior.NoAction);
        builder.HasOne(x => x.ServiceType)
               .WithMany()
               .HasForeignKey(x => x.ServiceTypeId)
               .OnDelete(DeleteBehavior.NoAction);
    }
}
