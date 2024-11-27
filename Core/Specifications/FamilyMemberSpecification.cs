using Core.Enteties;

namespace Core.Specifications;

public class FamilyMemberSpecification : BaseSpecification<FamilyMember>
{
    public FamilyMemberSpecification(int id) : base(x => x.Id == id)
    {
        AddInclude(x => x.Client);
        AddInclude(x => x.Gender);
        AddInclude(x => x.Status);
        AddInclude(x => x.Relationship);
    }

    public FamilyMemberSpecification(FamilyMemberSpecParams specParams, int? clientId = null) : base(x =>
        (string.IsNullOrEmpty(specParams.Search) || x.LastName.ToLower().Contains(specParams.Search)) &&
        (specParams.PhoneNumber.Count == 0 || specParams.PhoneNumber.Contains(x.PhoneNumber)) &&
        (specParams.Statuses.Count == 0 || specParams.Statuses.Contains(x.Status.Name)) &&
        (!clientId.HasValue || x.ClientId == clientId)
    )
    {
        ApplyPaging(specParams.PageSize * (specParams.PageIndex - 1), specParams.PageSize);

        AddInclude(x => x.Client);
        AddInclude(x => x.Gender);
        AddInclude(x => x.Status);
        AddInclude(x => x.Relationship);

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

    public FamilyMemberSpecification(int clientId, string firstName, string lastName, DateTime dateOfBirth)
     : base(x =>
         x.ClientId == clientId &&
         x.FirstName.ToLower() == firstName.ToLower() &&
         x.LastName.ToLower() == lastName.ToLower() &&
         x.DateOfBirth.Date == dateOfBirth.Date)
    {
    }

}
