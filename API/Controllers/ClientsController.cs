using API.Dtos;
using AutoMapper;
using Core.Enteties;
using Core.Enteties._LookUps;
using Core.Interfaces;
using Core.Specifications;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers;

public class ClientsController(IGenericRepository<Client> repo, IMapper mapper) : BaseApiController
{
    [HttpGet]
    public async Task<ActionResult<IReadOnlyList<ClientDto>>> GetClients(string? burialSociety, string? status, string? sort)
    {
        var spec = new ClientSpecification(burialSociety, status, sort);

        var clients = await repo.ListAsync(spec);

        return Ok(mapper.Map<IReadOnlyList<Client>, IReadOnlyList<ClientDto>>(clients));
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
    public async Task<ActionResult<Client>> CreateClient(Client client)
    {
        repo.Add(client);

        if (await repo.SaveAllAsync())
        {
            return CreatedAtAction("GetClient", new { id = client.Id }, client);
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

    // [HttpGet("document-types")]
    // public async Task<ActionResult<IReadOnlyList<DocumentType>>> GetDocumentTypes()
    // {
    //     // TODO: Implement method

    //     return Ok();
    // }

    private bool ClientExists(int id)
    {
        return repo.Exists(id);
    }
}
