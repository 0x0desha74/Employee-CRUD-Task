namespace EmployeeCRUDServer.Specifications
{
    public class EmployeeSpecParams
    {
        private const int maxPageSize = 10;
        private int pageSize = 5; 

        public int PageSize
        {
            get { return pageSize; }
            set { pageSize = value > maxPageSize ? value : value; }
        }

        private string? q;

        public string? Q
        {
            
            get { return q; }
            set { q = value?.ToLower(); }
        }


        public int PageIndex { get; set; } = 1;
    }
}
