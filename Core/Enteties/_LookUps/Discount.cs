namespace Core.Enteties._LookUps;

public class Discount : BaseEntity
{
    public required string Name { get; set; }
    public required string Description { get; set; }
    public decimal PercentageOff { get; set; }
    public bool IsActive { get; set; }
    public DateTime StartDate { get; set; }
    public DateTime EndDate { get; set; }
}
