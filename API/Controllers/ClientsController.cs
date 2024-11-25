using API.Dtos;
using AutoMapper;
using Core.Enteties;
using Core.Interfaces;
using Core.Specifications;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers;

public class ClientsController(IGenericRepository<Client> repo, IMapper mapper) : BaseApiController
{
    [HttpGet]
    public async Task<ActionResult<IReadOnlyList<ClientDto>>> GetClients([FromQuery] ClientSpecParams specParams)
    {
        var spec = new ClientSpecification(specParams);

        return await CreatePagedResult<Client, ClientDto>(repo, spec, specParams.PageIndex, specParams.PageSize, mapper);
    }

    [HttpGet("{id:int}")]
    public async Task<ActionResult<ClientDto>> GetClient(int id)
    {
        var spec = new ClientSpecification(id);

        var client = await repo.GetEntityWithSpec(spec);

        if (client == null) return NotFound();

        return Ok(mapper.Map<Client, ClientDto>(client));
    }

    [HttpPost]
    public async Task<ActionResult<ClientDto>> CreateClient(ClientDto clientDto)
    {
        if (await repo.ClientExist(clientDto.IdentityNumber, clientDto.Passport))
        {
            var message = GenerateDuplicateMessage(clientDto);
            return BadRequest(message);
        }

        var client = mapper.Map<Client>(clientDto);

        client.ReferenceNumber = GeneratedReferenceNumber();
        client.CreatedDate = DateTime.UtcNow;
        client.StatusId = 9;

        repo.Add(client);

        if (await repo.SaveAllAsync())
        {
            var clientToReturn = mapper.Map<ClientDto>(client);

            return CreatedAtAction("GetClient", new { id = client.Id }, clientToReturn);
        }

        return BadRequest("Problem creating client");
    }


    [HttpPut("{id:int}")]
    public async Task<ActionResult> UpdateClient(int id, Client client)
    {
        if (client.Id != id || !ClientExists(id)) return BadRequest("Cannot update this client");

        repo.Update(client);

        if (await repo.SaveAllAsync())
        {
            return NoContent();
        }

        return BadRequest("Problem updating the client");
    }

    private bool ClientExists(int id)
    {
        return repo.Exists(id);
    }

    private string GeneratedReferenceNumber()
    {
        return DateTime.UtcNow.ToString("yyyyMMdd") + "REF"
            + Guid.NewGuid().ToString("N")
            .Substring(0, 4)
            .ToUpper();
    }

    private string GenerateDuplicateMessage(ClientDto clientDto)
    {
        return clientDto switch
        {
            { IdentityNumber: not null and not "" } when string.IsNullOrEmpty(clientDto.Passport) =>
                $"A client with the same Identity Number '{clientDto.IdentityNumber}' already exists. Please verify the entered details.",

            { Passport: not null and not "" } when string.IsNullOrEmpty(clientDto.IdentityNumber) =>
                $"A client with the same Passport '{clientDto.Passport}' already exists. Please verify the entered details.",

            { IdentityNumber: not null and not "", Passport: not null and not "" } =>
                $"A client with the same Identity Number '{clientDto.IdentityNumber}' or Passport '{clientDto.Passport}' already exists. Please verify the entered details.",

            _ => "A client with the same details already exists. Please verify the entered details."
        };
    }
}
