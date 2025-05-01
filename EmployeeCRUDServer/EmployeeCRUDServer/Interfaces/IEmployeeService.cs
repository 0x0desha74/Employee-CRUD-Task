using EmployeeCRUDServer.DTOs.Requests;
using EmployeeCRUDServer.DTOs.Response;

namespace EmployeeCRUDServer.Interfaces
{
    public interface IEmployeeService
    {
        Task<EmployeeToReturnDto> CreateAsync(EmployeeToCreateDto dto);
    }
}
