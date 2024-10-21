using Core.Enteties._LookUps;

namespace Core.Enteties;

public class ResourceAllocation : BaseEntity
{
    public int FuneralEventId { get; set; }
    public int ResourceTypeId { get; set; }
    public int ResourceId { get; set; }
    public DateTime AssignedDate { get; set; }
    public int StatusId { get; set; }
    public string? Notes { get; set; }

    public FuneralEvent? FuneralEvent { get; set; }
    public ResourceType? ResourceType { get; set; }
    public Status? Status { get; set; }
}
