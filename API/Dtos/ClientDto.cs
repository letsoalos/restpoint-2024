using System.ComponentModel.DataAnnotations;

namespace API.Dtos;

public class ClientDto
{
    public int Id { get; set; }
    [Required]
    public required string FirstName { get; set; }
    [Required]
    public required string LastName { get; set; }
    public string Title { get; set; } = string.Empty;
    public int TitleId { get; set; }
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

    public string DocumentType { get; set; } = string.Empty;
    public int DocumentTypeId { get; set; }
    public string? IdentityNumber { get; set; }
    public string? Passport { get; set; }
    public string Ethnicity { get; set; } = string.Empty;
    public int EthnicityId { get; set; }
    public string Gender { get; set; } = string.Empty;
    public int GenderId { get; set; }
    public string MaritalStatus { get; set; } = string.Empty;
    public int MaritalStatusId { get; set; }
    [Phone]
    public string PhoneNumber { get; set; } = string.Empty;
    [Phone]
    public string? AltNumber { get; set; }
    [EmailAddress]
    public string? Email { get; set; }
    public string EmergencyContactName { get; set; } = string.Empty;
    [Phone]
    public string? EmergencyContactNumber { get; set; }
    public string StreetName { get; set; } = string.Empty;
    public string Suburb { get; set; } = string.Empty;
    public string City { get; set; } = string.Empty;
    public string PostalCode { get; set; } = string.Empty;
    public string Status { get; set; } = string.Empty;
    public int StatusId { get; set; }
    public int BranchId { get; set; }
    public string BurialSociety { get; set; } = string.Empty;
    public int? BurialSocietyId { get; set; }
    public string ReferenceNumber { get; set; } = string.Empty;
    public bool Consent { get; set; }
    public DateTime? CreatedDate { get; set; }
    public string? Branch { get; set; }
}
