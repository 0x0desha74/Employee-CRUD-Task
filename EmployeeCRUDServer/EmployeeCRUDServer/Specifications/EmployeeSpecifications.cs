using EmployeeCRUDServer.Entities;

namespace EmployeeCRUDServer.Specifications
{
    public class EmployeeSpecifications:BaseSpecifications<Employee>
    {
        public EmployeeSpecifications(EmployeeSpecParams specParams)
             : base(E =>
                string.IsNullOrEmpty(specParams.Q) ||
                E.FirstName.ToLower().Contains(specParams.Q.ToLower()) ||
                E.LastName.ToLower().Contains(specParams.Q.ToLower()) ||
                E.Email.ToLower().Contains(specParams.Q.ToLower()) ||
                E.Position.ToLower().Contains(specParams.Q.ToLower())
            )
        {
            ApplyPagination(specParams.PageSize * (specParams.PageIndex - 1), specParams.PageSize);
        }
    }
}
