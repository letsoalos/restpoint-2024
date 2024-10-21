namespace Core.Enteties._LookUps;

public class ServiceType : BaseEntity
{
    public required string Name { get; set; }
    public required string Description { get; set; }
    public bool IsActive { get; set; }
    public required string GroupCode { get; set; }
}
