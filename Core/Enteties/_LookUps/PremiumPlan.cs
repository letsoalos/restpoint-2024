namespace Core.Enteties._LookUps;

public class PremiumPlan : BaseEntity
{
    public required string Name { get; set; }
    public required string Description { get; set; }
    public decimal Amount { get; set; }
    public decimal CoverAmount { get; set; }
    public bool IActive { get; set; }
    public DateTime CreatedDate { get; set; }
}
