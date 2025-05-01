using EmployeeCRUDServer.Entities;
using System.Text.Json;

namespace EmployeeCRUDServer.Data
{
    public class ApplicationDbContextSeed
    {
        public async static Task DataSeedAsync(ApplicationDbContext context)
        {
            if (!context.Employees.Any())
            {
               
                var employeesData = File.ReadAllText("../EmployeeCRUDServer/Data/DataSeed/employees.json");
                var employees = JsonSerializer.Deserialize<List<Employee>>(employeesData);
                if(employees is not null && employees.Count > 0)
                {
                    foreach (var employee in employees)
                    {
                        await context.AddAsync(employee);
                    }
                    await context.SaveChangesAsync();
                }
            }
        }
    }
}
