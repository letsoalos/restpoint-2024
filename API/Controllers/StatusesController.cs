using Core.Enteties._LookUps;
using Core.Interfaces;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers;

public class StatusesController(IGenericRepository<Status> repo) : BaseApiController
{
    [HttpGet("status-list")]
    public async Task<ActionResult<IReadOnlyList<Status>>> GetStatuses()
    {
        var statusList = await repo.ListAllAsync();

        if (statusList == null) return NotFound();

        return Ok(statusList);
    }
}
