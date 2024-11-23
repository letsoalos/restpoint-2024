using Core.Enteties;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Infrastructure.Config;

public class ClientConfiguration : IEntityTypeConfiguration<Client>
{
       public void Configure(EntityTypeBuilder<Client> builder)
       {
              builder.Property(x => x.FirstName).HasMaxLength(255);
              builder.Property(x => x.LastName).HasMaxLength(100);
              builder.Property(x => x.IdentityNumber).HasMaxLength(50);
              builder.Property(x => x.Passport).HasMaxLength(50);
              builder.Property(x => x.PhoneNumber).HasMaxLength(50);
              builder.Property(x => x.AltNumber).HasMaxLength(50);
              builder.Property(x => x.Email).HasMaxLength(100);
              builder.Property(x => x.EmergencyContactName).HasMaxLength(255);
              builder.Property(x => x.ReferenceNumber).HasMaxLength(255);
              builder.HasOne(x => x.Gender)
                     .WithMany()
                     .HasForeignKey(x => x.GenderId)
                     .OnDelete(DeleteBehavior.NoAction);
              builder.HasOne(x => x.DocumentType)
                     .WithMany()
                     .HasForeignKey(x => x.DocumentTypeId)
                     .OnDelete(DeleteBehavior.NoAction);
              builder.HasOne(x => x.Status)
                     .WithMany()
                     .HasForeignKey(x => x.StatusId)
                     .OnDelete(DeleteBehavior.NoAction);
              builder.HasOne(x => x.BurialSociety)
                     .WithMany()
                     .HasForeignKey(x => x.BurialSocietyId)
                     .OnDelete(DeleteBehavior.NoAction);
              builder.HasOne(x => x.Ethnicity)
                    .WithMany()
                    .HasForeignKey(x => x.EthnicityId)
                    .OnDelete(DeleteBehavior.NoAction);
              builder.HasOne(x => x.Title)
                    .WithMany()
                    .HasForeignKey(x => x.TitleId)
                    .OnDelete(DeleteBehavior.NoAction);
              builder.HasOne(x => x.MaritalStatus)
                   .WithMany()
                   .HasForeignKey(x => x.MaritalStatusId)
                   .OnDelete(DeleteBehavior.NoAction);
              builder.HasOne(x => x.Branch)
                   .WithMany()
                   .HasForeignKey(x => x.BranchId)
                   .OnDelete(DeleteBehavior.NoAction);
       }
}
