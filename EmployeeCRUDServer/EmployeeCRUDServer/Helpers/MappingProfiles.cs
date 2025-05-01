using AutoMapper;
using EmployeeCRUDServer.DTOs.Requests;
using EmployeeCRUDServer.DTOs.Response;
using EmployeeCRUDServer.Entities;

namespace EmployeeCRUDServer.Helpers
{
    public class MappingProfiles:Profile
    {
        public MappingProfiles()
        {
            CreateMap<EmployeeToCreateDto, Employee>();
            CreateMap<Employee, EmployeeToReturnDto>();
        }
    }
}
