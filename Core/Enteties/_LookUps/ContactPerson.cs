namespace Core.Enteties._LookUps
{
    public class ContactPerson : BaseEntity
    {
        public required string FirstName { get; set; }
        public required string LastName { get; set; }
        public required string PhoneNumber { get; set; }
        public string? Email { get; set; }
        public string? JobTitle { get; set; }
        public string? Department { get; set; }
    }
}