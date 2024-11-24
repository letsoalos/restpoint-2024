using Core.Enteties._LookUps;

namespace Core.Specifications
{
    public class BranchSpecification : BaseSpecification<Branch>
    {
        public BranchSpecification(int id) : base(x => x.Id == id)
        {
            AddInclude(x => x.ContactPerson);
            AddInclude(x => x.Province);
        }

        public BranchSpecification(BranchSpecParams specParams) : base(x =>
        (string.IsNullOrEmpty(specParams.Search) || x.Name.ToLower().Contains(specParams.Search)) &&
        (string.IsNullOrEmpty(specParams.Search) || x.Province.Name.ToLower().Contains(specParams.Search)))
        {
            AddInclude(x => x.ContactPerson);
            AddInclude(x => x.Province);

            switch (specParams.Sort)
            {
                case "provinceAsc":
                    AddOrderBy(x => x.Province.Name);
                    break;
                case "provinceDesc":
                    AddOrderByDescending(x => x.Province.Name);
                    break;
                default:
                    AddOrderBy(x => x.Name);
                    break;
            }
        }
    }
}