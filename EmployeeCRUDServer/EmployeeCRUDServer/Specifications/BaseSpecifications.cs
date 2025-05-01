using EmployeeCRUDServer.Entities;
using System.Linq.Expressions;

namespace EmployeeCRUDServer.Specifications
{
    public class BaseSpecifications<T> : ISpecification<T> where T : BaseEntity
    {
        public Expression<Func<T, bool>> Criteria { get; set; }
        public List<Func<IQueryable<T>, IQueryable<T>>> Includes { get; } = new();
        public int Skip { get; set; }
        public int Take { get; set; }
        public bool IsPaginationEnabled { get; set; }
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
        public void ApplyPagination(int skip, int take)
        {
            IsPaginationEnabled = true;
            Skip = skip;
            Take = take;
        }
    }
}
