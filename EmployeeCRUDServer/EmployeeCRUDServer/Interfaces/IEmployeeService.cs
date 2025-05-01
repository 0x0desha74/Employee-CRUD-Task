using EmployeeCRUDServer.DTOs.Requests;
using EmployeeCRUDServer.DTOs.Response;

namespace EmployeeCRUDServer.Interfaces
{
    public interface IEmployeeService
    {
        Task<EmployeeToReturnDto> CreateAsync(EmployeeToCreateDto dto);
        Task<IReadOnlyList<EmployeeToReturnDto>> GetAllAsync();
        Task<EmployeeToReturnDto> GetByIdAsync(int id);
    }
}
