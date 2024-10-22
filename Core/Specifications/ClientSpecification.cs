using Core.Enteties;

namespace Core.Specifications;

public class ClientSpecification : BaseSpecification<Client>
{
    public ClientSpecification(string? documentType, string? status) : base(x =>
        (string.IsNullOrWhiteSpace(documentType) || x.DocumentType.Name == documentType) &&
        (string.IsNullOrWhiteSpace(status) || x.Status.Name == status)
    )
    {
    }
}
