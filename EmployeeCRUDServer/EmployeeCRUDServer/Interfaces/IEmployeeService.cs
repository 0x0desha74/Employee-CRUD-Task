using EmployeeCRUDServer.DTOs.Requests;
using EmployeeCRUDServer.DTOs.Response;
using EmployeeCRUDServer.Helpers;
using EmployeeCRUDServer.Specifications;

namespace EmployeeCRUDServer.Interfaces
{
    public interface IEmployeeService
    {
        Task<EmployeeToReturnDto> CreateAsync(EmployeeToCreateDto dto);
        Task<Pagination<EmployeeToReturnDto>> GetAllAsync(EmployeeSpecParams specParams);
        Task<EmployeeToReturnDto> GetByIdAsync(int id);
        Task<EmployeeToReturnDto> UpdateAsync(int id , EmployeeToUpdateDto dto);
        Task<bool> DeleteAsync(int id);
    }
}
