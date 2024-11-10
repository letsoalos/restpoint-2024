using API.Dtos;
using AutoMapper;
using Core.Enteties;
using Core.Interfaces;
using Core.Specifications;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers;

public class FamilyMembersController(IGenericRepository<FamilyMember> repo, IMapper mapper) : BaseApiController
{
    [HttpGet("family-members")]
    public async Task<ActionResult<IReadOnlyList<FamilyMemberDto>>> GetFamilyMembers([FromQuery] FamilyMemberSpecParams specParams,
        [FromQuery] int? clientId)
    {
        var spec = new FamilyMemberSpecification(specParams, clientId);

        return await CreatePagedResult<FamilyMember, FamilyMemberDto>(repo, spec, specParams.PageIndex, specParams.PageSize, mapper);
    }

    [HttpGet("{id:int}")]
    public async Task<ActionResult<FamilyMemberDto>> GetFamilyMember(int id)
    {
        var spec = new FamilyMemberSpecification(id);

        var familyMember = await repo.GetEntityWithSpec(spec);

        if (familyMember == null) return NotFound();

        return Ok(mapper.Map<FamilyMember, FamilyMemberDto>(familyMember));
    }
}
