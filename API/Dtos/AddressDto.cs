using System.ComponentModel.DataAnnotations;

namespace API.Dtos;

public class AddressDto
{
    [Required]
    public string StreetName { get; set; } = string.Empty;
    [Required]
    public string Suburb { get; set; } = string.Empty;
    [Required]
    public string City { get; set; } = string.Empty;
    [Required]
    public string PostalCode { get; set; } = string.Empty;
}
