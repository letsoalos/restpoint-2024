using Core.Enteties;

namespace Core.Specifications;

public class ClientSpecification : BaseSpecification<Client>
{
    public ClientSpecification(int id) : base(x => x.Id == id)
    {
        AddInclude(x => x.DocumentType);
        AddInclude(x => x.Title);
        AddInclude(x => x.Ethnicity);
        AddInclude(x => x.Status);
        AddInclude(x => x.Gender);
        AddInclude(x => x.Address);
        AddInclude(x => x.BurialSociety!);
    }

    public ClientSpecification(ClientSpecParams specParams) : base(x =>
        string.IsNullOrEmpty(specParams.Search) || x.IdentityNumber!.ToLower().Contains(specParams.Search) ||
        string.IsNullOrEmpty(specParams.Search) || x.Passport!.ToLower().Contains(specParams.Search) ||
        string.IsNullOrEmpty(specParams.Search) || x.FirstName.ToLower().Contains(specParams.Search) ||
        (string.IsNullOrEmpty(specParams.Search) || x.LastName.ToLower().Contains(specParams.Search)) &&
        (specParams.BurialSocieties.Count == 0 || specParams.BurialSocieties.Contains(x.BurialSociety!.Name)) &&
        (specParams.Statuses.Count == 0 || specParams.Statuses.Contains(x.Status.Name))
    )
    {
        ApplyPaging(specParams.PageSize * (specParams.PageIndex - 1), specParams.PageSize);

        AddInclude(x => x.DocumentType);
        AddInclude(x => x.Title);
        AddInclude(x => x.Ethnicity);
        AddInclude(x => x.Status);
        AddInclude(x => x.Gender);
        AddInclude(x => x.Address);
        AddInclude(x => x.BurialSociety!);

        switch (specParams.Sort)
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
