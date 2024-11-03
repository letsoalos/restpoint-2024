using Core.Enteties;
using Core.Interfaces;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers;

public class BurialSocietiesController(IGenericRepository<BurialSociety> repo) : BaseApiController
{
    [HttpGet("burial-societies")]
    public async Task<ActionResult<IReadOnlyList<BurialSociety>>> GetBurialSocieties()
    {
        var burialSocieties = await repo.ListAllAsync();

        if (burialSocieties == null) return NotFound();

        return Ok(burialSocieties);
    }
}
