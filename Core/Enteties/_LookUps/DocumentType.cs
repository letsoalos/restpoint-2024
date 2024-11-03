namespace Core.Enteties._LookUps;

public class DocumentType : BaseEntity
{
    public required string Name { get; set; }
    public required string Description { get; set; }
    public required string GroupCode { get; set; }
    public bool IsActive { get; set; }
}
