using System;
using System.ComponentModel.DataAnnotations;

namespace API.Dtos;

public class ClientDto
{
    public int Id { get; set; }
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
    public required string DocumentType { get; set; }
    public string? IdentityNumber { get; set; }
    public string? Passport { get; set; }
    public required string Gender { get; set; }
    [Phone]
    public required string PhoneNumber { get; set; }
    [EmailAddress]
    public string? Email { get; set; }
    public required string EmergencyContactName { get; set; }
    [Phone]
    public required string EmergencyContactNumber { get; set; }
    public required string StreetName { get; set; }
    public required string Suburb { get; set; }
    public required string City { get; set; }
    public required string PostalCode { get; set; }
    public required string Status { get; set; }
    public string? BurialSociety { get; set; }
    public required string ReferenceNumber { get; set; }
    public bool Consent { get; set; }
    public DateTime CreatedDate { get; set; }
    public int CreatedByUserId { get; set; }
    public DateTime? ModifiedDate { get; set; }
    public int? ModifiedByUserId { get; set; }
}
