using EmployeeCRUDServer.Entities;

namespace EmployeeCRUDServer.Specifications
{
    public class EmployeeFilterationAndCountSpecifications : BaseSpecifications<Employee>
    {
        public EmployeeFilterationAndCountSpecifications(EmployeeSpecParams specParams)
            : base(E =>
                string.IsNullOrEmpty(specParams.SearchTerm) ||
                E.FirstName.ToLower().Contains(specParams.SearchTerm.ToLower()) ||
                E.LastName.ToLower().Contains(specParams.SearchTerm.ToLower()) ||
                E.Email.ToLower().Contains(specParams.SearchTerm.ToLower()) ||
                E.Position.ToLower().Contains(specParams.SearchTerm.ToLower())
            )
        {
        }
    }
}
