using AutoMapper;
using EmployeeCRUDServer.DTOs.Requests;
using EmployeeCRUDServer.DTOs.Response;
using EmployeeCRUDServer.Entities;
using EmployeeCRUDServer.Interfaces;

namespace EmployeeCRUDServer.Services
{
    public class EmployeeService : IEmployeeService
    {
        private readonly IMapper _mapper;
        private readonly IUnitOfWork _unitOfWork;
        public EmployeeService(IMapper mapper, IUnitOfWork unitOfWork)
        {
            _mapper = mapper;
            _unitOfWork = unitOfWork;
        }

        public async Task<EmployeeToReturnDto> CreateAsync(EmployeeToCreateDto dto)
        {
            //the model validation is global

            var employee = _mapper.Map<Employee>(dto);
            await _unitOfWork.Repository<Employee>().AddAsync(employee);
            var result = await _unitOfWork.Complete();
            if (result > 0)
                return _mapper.Map<EmployeeToReturnDto>(employee);
            throw new InvalidOperationException("Failed to create employee entity.");

        }

        public async Task<IReadOnlyList<EmployeeToReturnDto>> GetAllAsync()
        {
            var employees = await _unitOfWork.Repository<Employee>().GetAllAsync();

            if (!employees.Any())
                return null; //will be handled in the endpoint
            return _mapper.Map<IReadOnlyList<EmployeeToReturnDto>>(employees);
        }

        public  async Task<EmployeeToReturnDto> GetByIdAsync(int id)
        {
            var employee = await _unitOfWork.Repository<Employee>().GetByIdAsync(id)
                ?? null;


            return _mapper.Map<EmployeeToReturnDto>(employee);
        }
    }
}
