using Core.Enteties._LookUps;

namespace Core.Enteties;

public class VehicleMaintenance : BaseEntity
{
    public int VehicleId { get; set; }
    public int OdometerReading { get; set; }
    public int ServiceTypeId { get; set; }
    public DateTime ServiceDate { get; set; }
    public decimal ServiceCost { get; set; }
    public DateTime? NextServiceDate { get; set; }
    public required string ServiceProvider { get; set; }
    public string? Notes { get; set; }

    public Vehicle? Vehiclehicle { get; set; }
    public ServiceType? ServiceType { get; set; }
}
