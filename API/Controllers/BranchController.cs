using API.Dtos;
using AutoMapper;
using Core.Enteties._LookUps;
using Core.Interfaces;
using Core.Specifications;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    public class BranchController(IGenericRepository<Branch> repo, IMapper mapper) : BaseApiController
    {
        [HttpGet("branch-list")]
        public async Task<ActionResult<IReadOnlyList<BranchDto>>> GetBranches([FromQuery] BranchSpecParams specParams)
        {
            var spec = new BranchSpecification(specParams);

            return await CreatePagedResult<Branch, BranchDto>(repo, spec, specParams.PageIndex, specParams.PageSize, mapper);
        }

        [HttpGet("{id:int}")]
        public async Task<ActionResult<BranchDto>> GetBranch(int id)
        {
            var spec = new BranchSpecification(id);

            var branch = await repo.GetEntityWithSpec(spec);

            if (branch == null) return NotFound();

            return Ok(mapper.Map<Branch, BranchDto>(branch));
        }

    }
}