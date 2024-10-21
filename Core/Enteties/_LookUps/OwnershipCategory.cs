namespace Core.Enteties._LookUps;

public class OwnershipCategory : BaseEntity
{
    public required string Name { get; set; }
    public required string Description { get; set; }
    public bool IsActive { get; set; }
}
