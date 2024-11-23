using System.ComponentModel.DataAnnotations;
using Core.Enteties._LookUps;

namespace Core.Enteties;

public class Client : BaseEntity
{
    public string FirstName { get; set; } = string.Empty;
    public string LastName { get; set; } = string.Empty;
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
    public string PhoneNumber { get; set; } = string.Empty;
    public string? AltNumber { get; set; }
    [EmailAddress]
    public string? Email { get; set; }
    public required string StreetName { get; set; }
    public required string Suburb { get; set; }
    public required string City { get; set; }
    public required string PostalCode { get; set; }
    public string EmergencyContactName { get; set; } = string.Empty;
    public string EmergencyContactNumber { get; set; } = string.Empty;
    public int BranchId { get; set; }
    public int StatusId { get; set; }
    public int? BurialSocietyId { get; set; }
    public string ReferenceNumber { get; set; } = string.Empty;
    public bool Consent { get; set; }
    public DateTime CreatedDate { get; set; }
    public int CreatedByUserId { get; set; }
    public DateTime? ModifiedDate { get; set; }
    public int? ModifiedByUserId { get; set; }

    public required Gender Gender { get; set; }
    public required DocumentType DocumentType { get; set; }
    public required Status Status { get; set; }
    public required BurialSociety BurialSociety { get; set; }
    public required Title Title { get; set; }
    public required Ethnicity Ethnicity { get; set; }
    public required MaritalStatus MaritalStatus { get; set; }
    public required Branch Branch { get; set; }
}
