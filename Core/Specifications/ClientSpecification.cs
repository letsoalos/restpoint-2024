using Core.Enteties;

namespace Core.Specifications;

public class ClientSpecification : BaseSpecification<Client>
{
    public ClientSpecification(int id) : base(x => x.Id == id)
    {
        AddInclude(x => x.DocumentType);
        AddInclude(x => x.Status);
        AddInclude(x => x.Gender);
        AddInclude(x => x.Address);
        AddInclude(x => x.BurialSociety!);
    }

    public ClientSpecification(string? burialSociety, string? status, string? sort) : base(x =>
        (string.IsNullOrWhiteSpace(burialSociety) || x.BurialSociety!.Name == burialSociety) &&
        (string.IsNullOrWhiteSpace(status) || x.Status.Name == status)
    )
    {
        AddInclude(x => x.DocumentType);
        AddInclude(x => x.Status);
        AddInclude(x => x.Gender);
        AddInclude(x => x.Address);
        AddInclude(x => x.BurialSociety!);

        switch (sort)
        {
            case "dateCreatedAsc":
                AddOrderBy(x => x.CreatedDate);
                break;
            case "dateCreatedDesc":
                AddOrderByDescending(x => x.CreatedDate);
                break;
            default:
                AddOrderBy(x => x.FirstName);
                break;
        }
    }
}
