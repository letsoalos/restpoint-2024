using Core.Enteties;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Infrastructure.Config;

public class ResourceAllocationConfiguration : IEntityTypeConfiguration<ResourceAllocation>
{
    public void Configure(EntityTypeBuilder<ResourceAllocation> builder)
    {
        builder.Property(x => x.Notes).HasMaxLength(255);
        builder.HasOne(x => x.FuneralEvent)
               .WithMany()
               .HasForeignKey(x => x.FuneralEventId)
               .OnDelete(DeleteBehavior.NoAction);
        builder.HasOne(x => x.ResourceType)
               .WithMany()
               .HasForeignKey(x => x.ResourceTypeId)
               .OnDelete(DeleteBehavior.NoAction);
        builder.HasOne(x => x.Status)
               .WithMany()
               .HasForeignKey(x => x.StatusId)
               .OnDelete(DeleteBehavior.NoAction);
    }
}
