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
    public async Task<ActionResult<IReadOnlyList<FamilyMemberDto>>> GetFamilyMembers([FromQuery] FamilyMemberSpecParams specParams)
    {
        var spec = new FamilyMemberSpecification(specParams);

        return await CreatePagedResult<FamilyMember, FamilyMemberDto>(repo, spec, specParams.PageIndex, specParams.PageSize, mapper);
    }
}
