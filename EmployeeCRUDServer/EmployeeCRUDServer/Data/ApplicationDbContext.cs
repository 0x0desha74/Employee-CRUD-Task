using EmployeeCRUDServer.Entities;
using Microsoft.EntityFrameworkCore;

namespace EmployeeCRUDServer.Data
{
    public class ApplicationDbContext : DbContext
    {
        public ApplicationDbContext(DbContextOptions options) : base(options)
        {
        }

        public DbSet<Employee> Employees { get; set; }

    }
}
