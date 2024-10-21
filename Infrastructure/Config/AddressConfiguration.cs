using Core.Enteties;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Infrastructure.Config;

public class AddressConfiguration : IEntityTypeConfiguration<Address>
{
    public void Configure(EntityTypeBuilder<Address> builder)
    {
        builder.Property(x => x.StreetName).HasMaxLength(255);
        builder.Property(x => x.Suburb).HasMaxLength(255);
        builder.Property(x => x.City).HasMaxLength(255);
        builder.Property(x => x.PostalCode).HasMaxLength(50);
    }
}
