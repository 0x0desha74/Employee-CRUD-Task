using EmployeeCRUDServer.DTOs.Requests;
using EmployeeCRUDServer.DTOs.Response;
using EmployeeCRUDServer.Entities;
using EmployeeCRUDServer.Errors;
using EmployeeCRUDServer.Helpers;
using EmployeeCRUDServer.Interfaces;
using EmployeeCRUDServer.Specifications;
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
        public async Task<ActionResult<IReadOnlyList<Pagination<EmployeeToReturnDto>>>> GetEmployees([FromQuery]EmployeeSpecParams specParams)
        {
            var employees = await _employeeService.GetAllAsync(specParams);
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


        [HttpPut("{id}")]
        public async Task<ActionResult<EmployeeToReturnDto>> Update(int id , EmployeeToUpdateDto model)
        {
            var employee = await _employeeService.UpdateAsync(id, model);

            if (employee is null)
                return NotFound(new ApiResponse(404));

            return Ok(employee);
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(int id)
        {
            var isDeleted = await _employeeService.DeleteAsync(id);

            if (!isDeleted)
                return NotFound(new ApiResponse(404));

            return NoContent();
        }
    }
}
