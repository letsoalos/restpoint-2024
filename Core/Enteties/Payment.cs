using Core.Enteties._LookUps;

namespace Core.Enteties;

public class Payment : BaseEntity
{
    public int ClientPremiumId { get; set; }
    public DateTime PaymentDate { get; set; }
    public decimal AmountPaid { get; set; }
    public int PaymentMethodId { get; set; }
    public int StatusId { get; set; }
    public string? TransactionId { get; set; }
    public required string InvoiceNumber { get; set; }
    public DateTime NextPaymentDueDate { get; set; }
    public DateTime CreatedDate { get; set; }
    public int CreatedByUserId { get; set; }
    public DateTime? ModifiedDate { get; set; }
    public int? ModifiedByUserId { get; set; }


    public ClientPremium? ClientPremium { get; set; }
    public PaymentMethod? PaymentMethod { get; set; }
    public Status? Status { get; set; }
}
