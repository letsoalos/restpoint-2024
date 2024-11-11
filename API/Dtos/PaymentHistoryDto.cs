namespace API.Dtos;

public class PaymentHistoryDto
{
    public int Id { get; set; }
    public DateTime PaymentDate { get; set; }
    public decimal TotalAmountPaid { get; set; }
    public required string ReferenceNumber { get; set; }
    public string? Description { get; set; }
    public DateTime CreatedDate { get; set; }
    public int CreatedByUserId { get; set; }
    public DateTime? ModifiedDate { get; set; }
    public int? ModifiedByUserId { get; set; }
    public int ClientId { get; set; }

    public required string Client { get; set; }
    public required string PaymentMethod { get; set; }
    public required string Status { get; set; }
}
