using EmployeeCRUDServer.Entities;

namespace EmployeeCRUDServer.Specifications
{
    public class EmployeeFilterationAndCountSpecifications : BaseSpecifications<Employee>
    {
        public EmployeeFilterationAndCountSpecifications(EmployeeSpecParams specParams)
            : base(E =>
                string.IsNullOrEmpty(specParams.Q) ||
                E.FirstName.ToLower().Contains(specParams.Q.ToLower()) ||
                E.LastName.ToLower().Contains(specParams.Q.ToLower()) ||
                E.Email.ToLower().Contains(specParams.Q.ToLower()) ||
                E.Position.ToLower().Contains(specParams.Q.ToLower())
            )
        {
        }
    }
}
