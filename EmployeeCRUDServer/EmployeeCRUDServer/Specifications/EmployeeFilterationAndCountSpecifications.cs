using EmployeeCRUDServer.Entities;

namespace EmployeeCRUDServer.Specifications
{
    public class EmployeeFilterationAndCountSpecifications : BaseSpecifications<Employee>
    {
        public EmployeeFilterationAndCountSpecifications(EmployeeSpecParams specParams)
            : base(E =>
                string.IsNullOrEmpty(specParams.Search) ||
                E.FirstName.ToLower().Contains(specParams.Search.ToLower()) ||
                E.LastName.ToLower().Contains(specParams.Search.ToLower()) ||
                E.Email.ToLower().Contains(specParams.Search.ToLower()) ||
                E.Position.ToLower().Contains(specParams.Search.ToLower())
            )
        {
        }
    }
}
