using Core.Enteties;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Infrastructure.Config;

public class FuneralEventConfiguration : IEntityTypeConfiguration<FuneralEvent>
{
    public void Configure(EntityTypeBuilder<FuneralEvent> builder)
    {
        builder.Property(x => x.DeceasedName).HasMaxLength(255);
        builder.Property(x => x.ServiceLocation).HasMaxLength(255);
        builder.Property(x => x.SpecialRequest).HasMaxLength(100);
        builder.HasOne(x => x.Client)
               .WithMany()
               .HasForeignKey(x => x.ClientId)
               .OnDelete(DeleteBehavior.NoAction);
        builder.HasOne(x => x.ServiceType)
               .WithMany()
               .HasForeignKey(x => x.ServiceTypeId)
               .OnDelete(DeleteBehavior.NoAction);
        builder.HasOne(x => x.Status)
               .WithMany()
               .HasForeignKey(x => x.StatusId)
               .OnDelete(DeleteBehavior.NoAction);
        builder.HasOne(x => x.Vehicle)
               .WithMany()
               .HasForeignKey(x => x.VehicleId)
               .OnDelete(DeleteBehavior.NoAction);
    }
}
