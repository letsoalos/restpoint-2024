using Core.Enteties._LookUps;

namespace Core.Enteties;

public class IncidentRecord : BaseEntity
{
    public int VehicleId { get; set; }
    public int AssignedDriverUserId { get; set; }
    public DateTime IncidentDate { get; set; }
    public required string Description { get; set; }
    public required string DamageAssesment { get; set; }
    public int StatusId { get; set; }
    public string? InsuranceClaimNumber { get; set; }

    public Vehicle? Vehicle { get; set; }
    public Status? Status { get; set; }
}
