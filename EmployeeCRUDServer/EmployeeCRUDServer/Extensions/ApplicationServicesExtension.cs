using EmployeeCRUDServer.Errors;
using EmployeeCRUDServer.Interfaces;
using Microsoft.AspNetCore.Mvc;

namespace EmployeeCRUDServer.Extensions
{
    public static class ApplicationServicesExtension
    {
        public static IServiceCollection AddApplicationServices(this IServiceCollection services)
        {


            //services.AddScoped(typeof(IEmployeeService), typeof(EmployeeService));







            services.Configure<ApiBehaviorOptions>(options =>
            {
                options.InvalidModelStateResponseFactory = (actionContext) =>
                {

                    var errors = actionContext.ModelState.Where(P => P.Value.Errors.Count > 0)
                                                            .SelectMany(P => P.Value.Errors)
                                                            .Select(E => E.ErrorMessage)
                                                            .ToArray();



                    var validationErrorResponse = new ApiValidationErrorResponse()
                    {
                        Errors = errors
                    };

                    return new BadRequestObjectResult(validationErrorResponse);
                };
            });


            return services;
        }
    }
}
