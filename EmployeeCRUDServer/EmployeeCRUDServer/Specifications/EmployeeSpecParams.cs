namespace EmployeeCRUDServer.Specifications
{
    public class EmployeeSpecParams
    {
        private const int maxPageSize = 10;
        private int pageSize = 10; 

        public int PageSize
        {
            get { return pageSize; }
            set { pageSize = value > maxPageSize ? value : value; }
        }

        private string? searchTerm;

        public string? SearchTerm
        {
            
            get { return searchTerm; }
            set { searchTerm = value?.ToLower(); }
        }


        public int PageIndex { get; set; } = 1;
    }
}
