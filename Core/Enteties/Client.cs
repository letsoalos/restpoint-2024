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
    public int DocumentTypeId { get; set; }
    public string? IdentityNumber { get; set; }
    public string? Passport { get; set; }
    public int GenderId { get; set; }
    [Phone]
    public required string PhoneNumber { get; set; }
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

    public Gender? Gender { get; set; }
    public DocumentType? DocumentType { get; set; }
    public Status? Status { get; set; }
    public BurialSociety? BurialSociety { get; set; }
    public Address? Address { get; set; }
}
