using System.Linq.Expressions;

namespace EmployeeCRUDServer.Specifications
{
    public interface ISpecification<T>
    {
        Expression<Func<T, bool>> Criteria { get; set; }
        List<Func<IQueryable<T>, IQueryable<T>>> Includes { get; }
    }
}
