namespace Core.Specifications
{
    public class BranchSpecParams
    {
        private const int MaxPageSize = 50;
        public int PageIndex { get; set; } = 1;

        private int _pageSize = 6;
        public int PageSize
        {
            get => _pageSize;
            set => _pageSize = (value > MaxPageSize) ? MaxPageSize : value;
        }

        private List<string> _province = [];
        public List<string> Province
        {
            get => _province;
            set
            {
                _province = value.SelectMany(x => x.Split(',', StringSplitOptions.RemoveEmptyEntries)).ToList();
            }
        }

        private List<string> _statuses = [];
        public List<string> Statuses
        {
            get => _statuses;
            set
            {
                _statuses = value.SelectMany(x => x.Split(',', StringSplitOptions.RemoveEmptyEntries)).ToList();
            }
        }

        public string? Sort { get; set; }

        private string? _search;
        public string Search
        {
            get => _search ?? "";
            set => _search = value.ToLower();
        }
    }
}