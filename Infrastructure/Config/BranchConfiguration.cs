using Core.Enteties._LookUps;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Infrastructure.Config
{
    public class BranchConfiguration : IEntityTypeConfiguration<Branch>
    {
        public void Configure(EntityTypeBuilder<Branch> builder)
        {
            builder.Property(x => x.Name).HasMaxLength(255);
            builder.Property(x => x.StreetName).HasMaxLength(255);
            builder.Property(x => x.Suburb).HasMaxLength(50);
            builder.Property(x => x.City).HasMaxLength(50);
            builder.Property(x => x.Code).HasMaxLength(50);
            builder.HasOne(x => x.Province)
                    .WithMany()
                    .HasForeignKey(x => x.ProviceId)
                    .OnDelete(DeleteBehavior.NoAction);
            builder.HasOne(x => x.ContactPerson)
                   .WithMany()
                   .HasForeignKey(x => x.ContactPersonId)
                   .OnDelete(DeleteBehavior.NoAction);
        }
    }
}