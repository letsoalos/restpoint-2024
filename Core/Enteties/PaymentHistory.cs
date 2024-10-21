using Core.Enteties._LookUps;

namespace Core.Enteties;

public class PaymentHistory : BaseEntity
{
    public int ClientId { get; set; }
    public DateTime PaymentDate { get; set; }
    public decimal TotalAmountPaid { get; set; }
    public int PaymentMethodId { get; set; }
    public required string ReferenceNumber { get; set; }
    public string? Description { get; set; }
    public int StatusId { get; set; }
    public DateTime CreatedDate { get; set; }
    public int CreatedByUserId { get; set; }
    public DateTime? ModifiedDate { get; set; }
    public int? ModifiedByUserId { get; set; }

    public Client? Client { get; set; }
    public PaymentMethod? PaymentMethod { get; set; }
    public Status? Status { get; set; }
}
