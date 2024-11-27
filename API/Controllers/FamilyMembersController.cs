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

    [HttpPost]
    public async Task<ActionResult<FamilyMemberDto>> CreateFamilyMember(FamilyMemberDto familyMemberDto)
    {
        var spec = new FamilyMemberSpecification(
            familyMemberDto.ClientId,
            familyMemberDto.FirstName,
            familyMemberDto.LastName,
            familyMemberDto.DateOfBirth
        );

        var existingFamilyMember = await repo.GetEntityWithSpec(spec);

        if (existingFamilyMember != null) return BadRequest("This family member already exists for the client.");


        var familyMember = mapper.Map<FamilyMember>(familyMemberDto);

        familyMember.CreatedDate = DateTime.UtcNow;
        familyMember.StatusId = 10;

        repo.Add(familyMember);

        if (await repo.SaveAllAsync())
        {
            var familyMemberToReturn = mapper.Map<FamilyMemberDto>(familyMember);

            return CreatedAtAction("GetFamilyMember", new { id = familyMember.Id }, familyMemberToReturn);
        }

        return BadRequest("Problem creating family member");
    }

    [HttpPut("{id:int}")]
    public async Task<ActionResult> UpdateFamilyMember(int id, FamilyMemberDto familyMemberDto)
    {
        var existingFamilyMember = await repo.GetByIdAsync(id);

        if (existingFamilyMember == null)
            return NotFound("Family member not found");

        mapper.Map(familyMemberDto, existingFamilyMember);

        existingFamilyMember.StatusId = 10;
        existingFamilyMember.ModifiedDate = DateTime.UtcNow;
        existingFamilyMember.ModifiedByUserId = 1;

        repo.Update(existingFamilyMember);

        if (await repo.SaveAllAsync())
        {
            return NoContent();
        }

        return BadRequest("Problem updating the family member");
    }

    [HttpPut("{id:int}/delete")]
    public async Task<ActionResult> SoftDeleteEntity(int id)
    {
        var entity = await repo.GetByIdAsync(id);

        if (entity == null)
            return NotFound("Entity not found");

        entity.StatusId = 4;
        entity.ModifiedDate = DateTime.UtcNow;
        entity.ModifiedByUserId = 1;

        await repo.SoftDelete(entity);

        return NoContent();
    }

}
