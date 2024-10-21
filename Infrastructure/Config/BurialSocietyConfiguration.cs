using Core.Enteties;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Infrastructure.Config;

public class BurialSocietyConfiguration : IEntityTypeConfiguration<BurialSociety>
{
    public void Configure(EntityTypeBuilder<BurialSociety> builder)
    {
        builder.Property(x => x.Name).HasMaxLength(255);
        builder.Property(x => x.ContactPerson).HasMaxLength(100);
        builder.Property(x => x.PhoneNumber).HasMaxLength(50);
        builder.Property(x => x.Email).HasMaxLength(255);
    }
}
