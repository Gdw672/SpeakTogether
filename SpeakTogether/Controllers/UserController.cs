using Microsoft.AspNetCore.Mvc;
using SpeakTogether.Enums;
using SpeakTogether.Service.Interface;

namespace SpeakTogether.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class UserController : ControllerBase
    {
        private readonly IUserService UserService;

        public UserController(IUserService userService)
        {
                this.UserService = userService;
        }

        [HttpPost("create")]
        public IActionResult CreateUser(string Name, string Email, string PasswordHash, DateTime RegistrationDate, LangLevel Level)
        {
           return Ok(UserService.CreateUser(Name, Email, PasswordHash, RegistrationDate, Level));
        }

        [HttpPost("soft-delete/{id}")]
        public IActionResult SoftDeleteUser(int id)
        {
            return Ok(UserService.SoftDelete(id));
        }
    }
}
