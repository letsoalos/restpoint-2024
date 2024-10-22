using Core.Enteties;
using Core.Enteties._LookUps;

namespace Core.Interfaces;

public interface IClientRepository
{
    Task<IReadOnlyList<Client>> GetClientsAsync();
    Task<Client?> GetClientByIdAsync(int id);
    Task<IReadOnlyList<Gender>> GetGendersAsync();
    Task<IReadOnlyList<DocumentType>> GetDocumentTypesAsync();
    Task<IReadOnlyList<Status>> GetStatusesAsync();
    Task<IReadOnlyList<BurialSociety?>> GetBurialSocietiesAsync();
    Task<IReadOnlyList<Address>> GetAddressesAsync();
    void AddClient(Client client);
    void UpdateClient(Client client);
    void DeleteClient(Client client);
    bool ClientExists(int id);
    Task<bool> SaveChangesAsync();
}
