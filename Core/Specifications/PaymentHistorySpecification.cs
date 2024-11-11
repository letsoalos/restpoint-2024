using Core.Enteties;

namespace Core.Specifications;

public class PaymentHistorySpecification : BaseSpecification<PaymentHistory>
{
    public PaymentHistorySpecification(int id) : base(x => x.Id == id)
    {
        AddInclude(x => x.Client);
        AddInclude(x => x.Status);
        AddInclude(x => x.PaymentMethod);
    }

    public PaymentHistorySpecification(PaymentHistorySpecParams specParams, int? clientId = null) : base(x =>
        (string.IsNullOrEmpty(specParams.Search) || x.ReferenceNumber.ToLower().Contains(specParams.Search)) &&
        (specParams.Statuses.Count == 0 || specParams.Statuses.Contains(x.Status.Name)) &&
        (!clientId.HasValue || x.ClientId == clientId)
    )
    {
        ApplyPaging(specParams.PageSize * (specParams.PageIndex - 1), specParams.PageSize);

        AddInclude(x => x.Client);
        AddInclude(x => x.Status);
        AddInclude(x => x.PaymentMethod);

        switch (specParams.Sort)
        {
            case "dateCreatedAsc":
                AddOrderBy(x => x.CreatedDate);
                break;
            case "dateCreatedDesc":
                AddOrderByDescending(x => x.CreatedDate);
                break;
            default:
                AddOrderBy(x => x.ReferenceNumber);
                break;
        }
    }
}
