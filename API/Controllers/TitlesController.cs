using System;
using Core.Enteties._LookUps;
using Core.Interfaces;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers;

public class TitlesController(IGenericRepository<Title> repo) : BaseApiController
{
    [HttpGet("title-list")]
    public async Task<ActionResult<IReadOnlyList<Title>>> GetTitles()
    {
        var titles = await repo.ListAllAsync();

        if (titles == null) return NotFound();

        return Ok(titles);
    }
}