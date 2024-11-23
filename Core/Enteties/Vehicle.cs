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
    public int BranchId { get; set; }

    public required AssetType AssetType { get; set; }
    public required Status Status { get; set; }
    public required OwnershipCategory OwnershipCategory { get; set; }
    public required Branch Branch { get; set; }
}
