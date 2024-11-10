using System.ComponentModel.DataAnnotations;

namespace API.Dtos;

public class ClientDto
{
    public int Id { get; set; }
    [Required]
    public string FirstName { get; set; } = string.Empty;
    [Required]
    public string LastName { get; set; } = string.Empty;
    public string Title { get; set; } = string.Empty;
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
    [Required]
    public string DocumentType { get; set; } = string.Empty;
    public string? IdentityNumber { get; set; }
    public string? Passport { get; set; }
    public string Ethnicity { get; set; } = string.Empty;
    [Required]
    public string Gender { get; set; } = string.Empty;

    public required string MaritalStatus { get; set; }
    [Phone]
    public string PhoneNumber { get; set; } = string.Empty;
    public string? AltNumber { get; set; }
    [EmailAddress]
    public string? Email { get; set; }
    [Required]
    public string EmergencyContactName { get; set; } = string.Empty;
    [Phone]
    public string EmergencyContactNumber { get; set; } = string.Empty;
    [Required]
    public string StreetName { get; set; } = string.Empty;
    [Required]
    public string Suburb { get; set; } = string.Empty;
    [Required]
    public string City { get; set; } = string.Empty;
    [Required]
    public string PostalCode { get; set; } = string.Empty;
    [Required]
    public string Status { get; set; } = string.Empty;
    public string? BurialSociety { get; set; }
    [Required]
    public string ReferenceNumber { get; set; } = string.Empty;
    public bool Consent { get; set; }
    public DateTime CreatedDate { get; set; }
    public int CreatedByUserId { get; set; }
    public DateTime? ModifiedDate { get; set; }
    public int? ModifiedByUserId { get; set; }
}
