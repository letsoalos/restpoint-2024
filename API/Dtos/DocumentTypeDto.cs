using System;
using System.ComponentModel.DataAnnotations;

namespace API.Dtos;

public class DocumentTypeDto
{
    [Required]
    public required string Name { get; set; }
    [Required]
    public required string Description { get; set; }

    [Required]
    [StringLength(4, MinimumLength = 4, ErrorMessage = "Code must be exactly 4 charecters long.")]
    public required string GroupCode { get; set; }
    public bool IsActive { get; set; }
}
