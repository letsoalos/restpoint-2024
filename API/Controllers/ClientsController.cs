using Core.Enteties;
using Infrastructure.Data;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace API.Controllers;

public class ClientsController(DataContext context) : BaseApiController
{
    [HttpGet]
    public async Task<ActionResult<IEnumerable<Client>>> GetClients()
    {
        return await context.Clients.ToListAsync();
    }

    [HttpGet("{id:int}")]
    public async Task<ActionResult<Client>> GetClient(int id)
    {
        var client = await context.Clients.FindAsync(id);

        if (client == null) return NotFound();

        return client;
    }

    [HttpPost]
    public async Task<ActionResult<Client>> CreateClient(Client client)
    {
        context.Clients.Add(client);

        await context.SaveChangesAsync();

        return client;
    }

    [HttpPut("{id:int}")]
    public async Task<ActionResult> UpdateClient(int id, Client client)
    {
        if (client.Id != id || !ClientExists(id)) return BadRequest("Cannot update this client");

        context.Entry(client).State = EntityState.Modified;

        await context.SaveChangesAsync();

        return NoContent();
    }

    private bool ClientExists(int id)
    {
        return context.Clients.Any(x => x.Id == id);
    }
}
