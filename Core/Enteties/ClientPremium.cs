using Core.Enteties._LookUps;

namespace Core.Enteties;

public class ClientPremium : BaseEntity
{
    public int ClientId { get; set; }
    public int PremiumPlanId { get; set; }
    public decimal TotalAmountPaid { get; set; }
    public DateTime StartDate { get; set; }
    public int PaymentFrequencyId { get; set; }
    public bool IsActive { get; set; }

    public Client? Client { get; set; }
    public PremiumPlan? PremiumPlan { get; set; }
    public PaymentFrequency? PaymentFrequency { get; set; }
}
