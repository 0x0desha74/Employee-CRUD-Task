using EmployeeCRUDServer.Entities;
using System.Linq.Expressions;

namespace EmployeeCRUDServer.Specifications
{
    public class BaseSpecifications<T> : ISpecification<T> where T : BaseEntity
    {
        public Expression<Func<T, bool>> Criteria { get; set; }
        public List<Func<IQueryable<T>, IQueryable<T>>> Includes { get; } = new();

        public BaseSpecifications()
        {

        }
        public BaseSpecifications(Expression<Func<T, bool>> criteria)
        {
            Criteria = criteria;
        }
        protected void AddIncludes(Func<IQueryable<T>, IQueryable<T>> thenIncludeExpression)
        {
            Includes.Add(thenIncludeExpression);
        }
    }
}
