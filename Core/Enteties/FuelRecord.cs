using System.ComponentModel.DataAnnotations;

namespace Core.Enteties;

public class FuelRecord : BaseEntity
{
    public int VehicleId { get; set; }
    public DateTime DateFilled { get; set; }
    public decimal FuelAmount { get; set; }
    [Range(0, int.MaxValue, ErrorMessage = "Odometer reading must be a positive number.")]
    public int OdometerReading { get; set; }
    public required string FuelStation { get; set; }

    public Vehicle? Vehicle { get; set; }
}
