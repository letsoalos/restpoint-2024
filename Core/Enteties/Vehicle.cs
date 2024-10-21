using Core.Enteties._LookUps;

namespace Core.Enteties;

public class Vehicle : BaseEntity
{
    public int AssetTypeId { get; set; }
    public required string RegistrationNumber { get; set; }
    public required string Make { get; set; }
    public required string Model { get; set; }
    public required string Year { get; set; }
    public int StatusId { get; set; }
    public int OwnershipCategoryId { get; set; }
    public int Mileage { get; set; }
    public int AssignedDriverUserId { get; set; }

    public AssetType? AssetType { get; set; }
    public Status? Status { get; set; }
    public OwnershipCategory? OwnershipCategory { get; set; }
}
