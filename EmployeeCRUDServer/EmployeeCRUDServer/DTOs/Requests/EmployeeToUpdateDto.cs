using System.ComponentModel.DataAnnotations;

namespace EmployeeCRUDServer.DTOs.Requests
{
    public class EmployeeToUpdateDto
    {
       
        [Required, MaxLength(30)]
        public string FirstName { get; set; }
        [Required, MaxLength(30)]
        public string LastName { get; set; }
        [Required, MaxLength(100), EmailAddress]
        public string Email { get; set; }
        [Required, MaxLength(50)]
        public string Position { get; set; }
    }
}
