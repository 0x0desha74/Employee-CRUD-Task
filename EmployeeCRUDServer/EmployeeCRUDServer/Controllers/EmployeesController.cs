using EmployeeCRUDServer.DTOs.Requests;
using EmployeeCRUDServer.DTOs.Response;
using EmployeeCRUDServer.Errors;
using EmployeeCRUDServer.Interfaces;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace EmployeeCRUDServer.Controllers
{

    public class EmployeesController : BaseApiController
    {
        private readonly IEmployeeService _employeeService;

        public EmployeesController(IEmployeeService employeeService)
        {
            _employeeService = employeeService;
        }

        [HttpGet]
        public async Task<ActionResult<IReadOnlyList<EmployeeToReturnDto>>> GetEmployees()
        {
            var employees = await _employeeService.GetAllAsync();

            if (employees is null)
                return NotFound(new ApiResponse(404));

            return Ok(employees);
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<EmployeeToReturnDto>> GetEmployee(int id)
        {
            var employee = await _employeeService.GetByIdAsync(id);

            if (employee is null)
                return NotFound(new ApiResponse(404));

            return Ok(employee);
        }


        [HttpPost]
        public async Task<ActionResult<EmployeeToReturnDto>> Create(EmployeeToCreateDto model)
        {
            var employee = await _employeeService.CreateAsync(model);
            return Ok(employee);
        }
    }
}
