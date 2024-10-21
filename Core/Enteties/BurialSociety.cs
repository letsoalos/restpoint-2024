namespace Core.Enteties;

public class BurialSociety : BaseEntity
{
    public required string Name { get; set; }
    public required string ContactPerson { get; set; }
    public required string PhoneNumber { get; set; }
    public string? Email { get; set; }
    public DateTime CreatedDate { get; set; }
    public int CreatedByUserId { get; set; }
}
