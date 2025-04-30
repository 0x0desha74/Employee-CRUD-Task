using EmployeeCRUDServer.Data;
using EmployeeCRUDServer.Entities;
using EmployeeCRUDServer.Interfaces;
using EmployeeCRUDServer.Specifications;
using Microsoft.EntityFrameworkCore;

namespace EmployeeCRUDServer.Repositories
{
    public class GenericRepository<T> : IGenericRepository<T> where T : BaseEntity
    {
        private readonly ApplicationDbContext _dbContext;

        public GenericRepository(ApplicationDbContext dbContext)
        {
            _dbContext = dbContext;
        }

        public async Task AddAsync(T entity)
        {
            await _dbContext.Set<T>().AddAsync(entity);
        }

        public void Delete(T entity)
        {
            _dbContext.Set<T>().Remove(entity);
        }

        public async Task<IReadOnlyList<T>> GetAllAsync()
        {
            return await _dbContext.Set<T>().ToListAsync();
        }

        public async Task<IReadOnlyList<T>> GetAllWithSpecAsync(ISpecification<T> spec)
        {
            return await ApplySpecifications(spec).ToListAsync();
        }

        public async Task<T> GetByIdAsync(Guid id)
        {
            return await _dbContext.Set<T>().FindAsync(id);
        }

        public async Task<T> GetEntityWithAsync(ISpecification<T> spec)
        {
            return await ApplySpecifications(spec).FirstOrDefaultAsync();
        }

        public void Update(T entity)
        {
            _dbContext.Set<T>().Update(entity);
        }

        private IQueryable<T> ApplySpecifications(ISpecification<T> spec)
        {
            return SpecificationEvaluator<T>.GetQuery(_dbContext.Set<T>(), spec);
        }


    }
}
