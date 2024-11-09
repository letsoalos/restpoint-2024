using Core.Enteties._LookUps;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Infrastructure.Config;

public class EthnicityConfiguration : IEntityTypeConfiguration<Ethnicity>
{
    public void Configure(EntityTypeBuilder<Ethnicity> builder)
    {
        builder.Property(x => x.Name).HasMaxLength(255);
        builder.Property(x => x.Description).HasMaxLength(255);
    }
}
