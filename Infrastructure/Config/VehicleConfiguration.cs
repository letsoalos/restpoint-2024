using Core.Enteties;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Infrastructure.Config;

public class VehicleConfiguration : IEntityTypeConfiguration<Vehicle>
{
    public void Configure(EntityTypeBuilder<Vehicle> builder)
    {
        builder.Property(x => x.RegistrationNumber).HasMaxLength(50);
        builder.Property(x => x.Make).HasMaxLength(50);
        builder.Property(x => x.Model).HasMaxLength(50);
        builder.Property(x => x.Year).HasMaxLength(50);
        builder.HasOne(x => x.AssetType)
               .WithMany()
               .HasForeignKey(x => x.AssetTypeId)
               .OnDelete(DeleteBehavior.NoAction);
        builder.HasOne(x => x.OwnershipCategory)
               .WithMany()
               .HasForeignKey(x => x.OwnershipCategoryId)
               .OnDelete(DeleteBehavior.NoAction);
        builder.HasOne(x => x.Status)
               .WithMany()
               .HasForeignKey(x => x.StatusId)
               .OnDelete(DeleteBehavior.NoAction);
    }
}
