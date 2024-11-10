using Core.Enteties._LookUps;
using Core.Interfaces;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers;

public class MaritalStatusController(IGenericRepository<MaritalStatus> repo) : BaseApiController
{
    [HttpGet("marital-statuses")]
    public async Task<ActionResult<IReadOnlyList<MaritalStatus>>> GetMaritalStatus()
    {
        var maritalStatus = await repo.ListAllAsync();

        if (maritalStatus == null) return NotFound();

        return Ok(maritalStatus);
    }
}
