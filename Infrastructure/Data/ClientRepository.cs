using Core.Enteties;
using Core.Enteties._LookUps;
using Core.Interfaces;
using Microsoft.EntityFrameworkCore;

namespace Infrastructure.Data;

public class ClientRepository(DataContext context) : IClientRepository
{
    public void AddClient(Client client)
    {
        context.Clients.Add(client);
    }

    public bool ClientExists(int id)
    {
        return context.Clients.Any(x => x.Id == id);
    }

    public void DeleteClient(Client client)
    {
        context.Clients.Remove(client);
    }

    public Task<IReadOnlyList<Address>> GetAddressesAsync()
    {
        throw new NotImplementedException();
    }

    public Task<IReadOnlyList<BurialSociety?>> GetBurialSocietiesAsync()
    {
        throw new NotImplementedException();
    }

    public async Task<Client?> GetClientByIdAsync(int id)
    {
        return await context.Clients
            .Include(c => c.Gender)
            .Include(c => c.DocumentType)
            .Include(c => c.Status)
            .Include(c => c.Address)
            .Include(c => c.BurialSociety)
            .FirstOrDefaultAsync(x => x.Id == id);
    }

    public async Task<IReadOnlyList<Client>> GetClientsAsync()
    {
        return await context.Clients
            .Include(c => c.Gender)
            .Include(c => c.DocumentType)
            .Include(c => c.Status)
            .Include(c => c.Address)
            .Include(c => c.BurialSociety)
            .ToListAsync();
    }

    public async Task<IReadOnlyList<DocumentType>> GetDocumentTypesAsync()
    {
        return await context.DocumentTypes.ToListAsync();
    }

    public Task<IReadOnlyList<Gender>> GetGendersAsync()
    {
        throw new NotImplementedException();
    }

    public Task<IReadOnlyList<Status>> GetStatusesAsync()
    {
        throw new NotImplementedException();
    }

    public async Task<bool> SaveChangesAsync()
    {
        return await context.SaveChangesAsync() > 0;
    }

    public void UpdateClient(Client client)
    {
        context.Entry(client).State = EntityState.Modified;
    }
}
