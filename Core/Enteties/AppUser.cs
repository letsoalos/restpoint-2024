using Microsoft.AspNetCore.Identity;

namespace Core.Enteties;

public class AppUser : IdentityUser
{
    public string? FirstName { get; set; }
    public string? LastName { get; set; }
}
