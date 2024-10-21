namespace Core.Enteties._LookUps;

public class AssetType : BaseEntity
{
    public required string Name { get; set; }
    public required string Description { get; set; }
    public int? Capacity { get; set; }
    public bool IActive { get; set; }
}
