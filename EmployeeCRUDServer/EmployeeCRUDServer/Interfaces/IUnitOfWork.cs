using EmployeeCRUDServer.Entities;

namespace EmployeeCRUDServer.Interfaces
{
    public interface IUnitOfWork : IDisposable
    {
        IGenericRepository<T> Repository<T>() where T : BaseEntity;
        Task<int> Complete();
    }
}
