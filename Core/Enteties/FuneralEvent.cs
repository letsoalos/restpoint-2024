using Core.Enteties._LookUps;

namespace Core.Enteties;

public class FuneralEvent : BaseEntity
{
    public int ClientId { get; set; }
    public required string DeceasedName { get; set; }
    public DateTime EventDate { get; set; }
    public required string ServiceLocation { get; set; }
    public int ServiceTypeId { get; set; }
    public int StatusId { get; set; }
    public string? SpecialRequest { get; set; }
    public DateTime CreatedDate { get; set; }
    public int CreatedByUserId { get; set; }
    public DateTime? ModifiedDate { get; set; }
    public int? ModifiedByUserId { get; set; }
    public int VehicleId { get; set; }

    public Client? Client { get; set; }
    public ServiceType? ServiceType { get; set; }
    public Status? Status { get; set; }
    public Vehicle? Vehicle { get; set; }
}
