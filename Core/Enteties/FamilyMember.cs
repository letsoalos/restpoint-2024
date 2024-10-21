using System.ComponentModel.DataAnnotations;
using Core.Enteties._LookUps;

namespace Core.Enteties;

public class FamilyMember : BaseEntity
{
    public int ClientId { get; set; }
    public required string FirstName { get; set; }
    public required string LastName { get; set; }
    public int GenderId { get; set; }
    public int RelationshipId { get; set; }
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
    [Phone]
    public required string PhoneNumber { get; set; }
    [EmailAddress]
    public string? Email { get; set; }
    public bool IsBeneficiary { get; set; }
    public int StatusId { get; set; }
    public DateTime CreatedDate { get; set; }
    public int CreatedByUserId { get; set; }
    public DateTime? ModifiedDate { get; set; }
    public int? ModifiedByUserId { get; set; }


    public Client? Client { get; set; }
    public Gender? Gender { get; set; }
    public Relationship? Relationship { get; set; }
    public Status? Status { get; set; }
}
