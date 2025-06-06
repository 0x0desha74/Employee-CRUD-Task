﻿using AutoMapper;
using EmployeeCRUDServer.DTOs.Requests;
using EmployeeCRUDServer.DTOs.Response;
using EmployeeCRUDServer.Entities;
using EmployeeCRUDServer.Helpers;
using EmployeeCRUDServer.Interfaces;
using EmployeeCRUDServer.Specifications;

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



        public async Task<Pagination<EmployeeToReturnDto>> GetAllAsync(EmployeeSpecParams specPrams)
        {
            var employees = await _unitOfWork.Repository<Employee>().GetAllWithSpecAsync(new EmployeeSpecifications(specPrams));
           
            var countSpec = new EmployeeFilterationAndCountSpecifications(specPrams);
            var count = await _unitOfWork.Repository<Employee>().GetCountWithSpecAsync(countSpec);

            if (!employees.Any())
                return null; //will be handled in the endpoint
            var data =  _mapper.Map<IReadOnlyList<EmployeeToReturnDto>>(employees);
            return new Pagination<EmployeeToReturnDto>(specPrams.PageIndex,specPrams.PageSize,count,data);
        }

        public async Task<EmployeeToReturnDto> GetByIdAsync(int id)
        {
            var employee = await _unitOfWork.Repository<Employee>().GetByIdAsync(id)
                ?? null;


            return _mapper.Map<EmployeeToReturnDto>(employee);
        }

        public async Task<EmployeeToReturnDto> UpdateAsync(int id, EmployeeToUpdateDto dto)
        {

            var existingEmployee = await _unitOfWork.Repository<Employee>().GetByIdAsync(id)
                ?? null;

            _mapper.Map(dto, existingEmployee);
            _unitOfWork.Repository<Employee>().Update(existingEmployee);
            var result = await _unitOfWork.Complete();

            if (result > 0)
                return _mapper.Map<EmployeeToReturnDto>(existingEmployee);
            throw new InvalidOperationException("Failed to update employee entity.");

        }

        public async Task<bool> DeleteAsync(int id)
        {
            var employee = await _unitOfWork.Repository<Employee>().GetByIdAsync(id);

            if (employee is null)
                return false;

             _unitOfWork.Repository<Employee>().Delete(employee);

            var result = await _unitOfWork.Complete();
            return result > 0 ? true
                : throw new InvalidOperationException("Failed to delete employee entity.");
        }
    }
}
