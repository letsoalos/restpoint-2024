using Core.Enteties._LookUps;
using Core.Interfaces;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers;

public class RelationshipsController(IGenericRepository<Relationship> repo) : BaseApiController
{
    [HttpGet("relationship-list")]
    public async Task<ActionResult<IReadOnlyList<Relationship>>> GetRelationships()
    {
        var relationships = await repo.ListAllAsync();

        if (relationships == null) return NotFound();

        return Ok(relationships);
    }
}
