using System.ComponentModel.DataAnnotations;
using Core.Enteties._LookUps;

namespace Core.Enteties;

public class Client : BaseEntity
{
    public required string FirstName { get; set; }
    public required string LastName { get; set; }
    public DateTime DateOfBirth { get; set; }
    public int Age
    {
        get
        {
            var today = DateTime.Today;
            var age = today.Year - DateOfBirth.Year;
            if (DateOfBirth.Date > today.AddYears(-age)) age--;
            return age;
        }
    }
    public int TitleId { get; set; }
    public int MaritalStatusId { get; set; }
    public int DocumentTypeId { get; set; }
    public string? IdentityNumber { get; set; }
    public string? Passport { get; set; }
    public int GenderId { get; set; }
    public int EthnicityId { get; set; }
    [Phone]
    public required string PhoneNumber { get; set; }
    [Phone]
    public string? AltNumber { get; set; }
    [EmailAddress]
    public string? Email { get; set; }
    public required string EmergencyContactName { get; set; }
    [Phone]
    public required string EmergencyContactNumber { get; set; }
    public int AddressId { get; set; }
    public int StatusId { get; set; }
    public int? BurialSocietyId { get; set; }
    public required string ReferenceNumber { get; set; }
    public bool Consent { get; set; }
    public DateTime CreatedDate { get; set; }
    public int CreatedByUserId { get; set; }
    public DateTime? ModifiedDate { get; set; }
    public int? ModifiedByUserId { get; set; }

    public required Gender Gender { get; set; }
    public required DocumentType DocumentType { get; set; }
    public required Status Status { get; set; }
    public required BurialSociety BurialSociety { get; set; }
    public required Address Address { get; set; }
    public required Title Title { get; set; }
    public required Ethnicity Ethnicity { get; set; }
    public required MaritalStatus MaritalStatus { get; set; }
}
