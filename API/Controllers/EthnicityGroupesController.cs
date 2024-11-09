using Core.Enteties._LookUps;
using Core.Interfaces;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers;

public class EthnicityGroupesController(IGenericRepository<Ethnicity> repo) : BaseApiController
{
    [HttpGet("ethnicity-groups")]
    public async Task<ActionResult<IReadOnlyList<Ethnicity>>> GetEthnicityGroup()
    {
        var ethnicityGroupList = await repo.ListAllAsync();

        if (ethnicityGroupList == null) return NotFound();

        return Ok(ethnicityGroupList);
    }
}
