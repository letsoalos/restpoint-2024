using Core.Enteties._LookUps;
using Core.Interfaces;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers;

public class GendersController(IGenericRepository<Gender> repo) : BaseApiController
{
    [HttpGet("gender-list")]
    public async Task<ActionResult<IReadOnlyList<Gender>>> GetGender()
    {
        var genderList = await repo.ListAllAsync();

        if (genderList == null) return NotFound();

        return Ok(genderList);
    }
}
