using Microsoft.AspNetCore.Identity.Data;
using Microsoft.AspNetCore.Mvc;
using SpeakTogether.Models.DTOs;
using SpeakTogether.Models.DTOs.login;
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
        public IActionResult CreateUser([FromBody] Models.DTOs.register.RegisterRequest request)

        {
            var result = UserService.CreateUser(request.Username, request.Email, request.Password, DateTime.Now);

            if (result == null)
                return Conflict(new RegisterResponse
                {
                    Success = false,
                    Message = "Register is not successeful"
                });
                   
            return Created("", new RegisterResponse
            {
                Success = true,
                Message = "User has created!"
            });
        }

        [HttpPost("soft-delete/{id}")]
        public IActionResult SoftDeleteUser(int id)
        {
            return Ok(UserService.SoftDelete(id));
        }

        [HttpPost("log-in")]
        public async Task<IActionResult> Login([FromBody] Models.DTOs.login.LoginRequest request)
        {
            var result = await UserService.LoginAsync(request.Email, request.Password);

            if(result == null)
            {
                return Unauthorized(new
                {
                    Message = "Wrong email or password"
                });
            }

            return Ok(new LoginResponse
            {
                Token = result
            });
        }



        [HttpPost("verify-password")]
        public IActionResult VerifyPassword([FromBody] Models.DTOs.login.LoginRequest request)
        {
            var result = UserService.Verify(request.Email, request.Password);

            if (!result)
            {
                return Unauthorized(new
                {
                    Message = "Wrong email or password"
                });
            }

            return Ok(
                "Login successful"
            );
        }
    }
}
