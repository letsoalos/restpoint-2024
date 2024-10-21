using Core.Enteties;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Infrastructure.Config;

public class FamilyMemberConfiguration : IEntityTypeConfiguration<FamilyMember>
{
    public void Configure(EntityTypeBuilder<FamilyMember> builder)
    {
        builder.Property(x => x.FirstName).HasMaxLength(255);
        builder.Property(x => x.LastName).HasMaxLength(100);
        builder.Property(x => x.PhoneNumber).HasMaxLength(50);
        builder.Property(x => x.Email).HasMaxLength(100);
        builder.HasOne(x => x.Gender)
               .WithMany()
               .HasForeignKey(x => x.GenderId)
               .OnDelete(DeleteBehavior.NoAction);
        builder.HasOne(x => x.Client)
               .WithMany()
               .HasForeignKey(x => x.ClientId)
               .OnDelete(DeleteBehavior.NoAction);
        builder.HasOne(x => x.Status)
               .WithMany()
               .HasForeignKey(x => x.StatusId)
               .OnDelete(DeleteBehavior.NoAction);
        builder.HasOne(x => x.Relationship)
               .WithMany()
               .HasForeignKey(x => x.RelationshipId)
               .OnDelete(DeleteBehavior.NoAction);
    }
}
