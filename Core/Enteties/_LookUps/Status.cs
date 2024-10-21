using System;
using System.ComponentModel.DataAnnotations;

namespace Core.Enteties._LookUps;

public class Status : BaseEntity
{
    public required string Name { get; set; }
    public required string Description { get; set; }

    [StringLength(4, MinimumLength = 4, ErrorMessage = "Code must be exactly 4 charecters long.")]
    public required string GroupCode { get; set; }
    public bool IsActive { get; set; }

}
