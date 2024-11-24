using System.ComponentModel.DataAnnotations;

namespace API.Dtos
{
    public class BranchDto
    {
        public int Id { get; set; }
        [Required]
        public string Name { get; set; } = string.Empty;
        [Required]
        public string StreetName { get; set; } = string.Empty;
        [Required]
        public string Suburb { get; set; } = string.Empty;
        [Required]
        public string City { get; set; } = string.Empty;
        [Required]
        public string Code { get; set; } = string.Empty;
        public int ProvinceId { get; set; }
        public int ContactPersonId { get; set; }
        public string Province { get; set; } = string.Empty;
        public string ContactPerson { get; set; } = string.Empty;
    }
}