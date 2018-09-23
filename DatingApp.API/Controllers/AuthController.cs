using System.Threading.Tasks;
using DatingApp.API.Data;
using DatingApp.API.Dtos;
using DatingApp.API.Models;
using Microsoft.AspNetCore.Mvc;

namespace DatingApp.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AuthController : ControllerBase
    {
        private readonly IAuthRepository repo;

        public AuthController(IAuthRepository repo)
        {
            this.repo = repo;
        }

        [HttpPost]
        public async Task<IActionResult> Register(UserForRegisterDtos userForRegisterDtos)
        {
            userForRegisterDtos.Username = userForRegisterDtos.Username.ToLower();

            if (await repo.UserExists(userForRegisterDtos.Username))
                return BadRequest("User Already Exist");

            var userToCreate = new User 
            {
                Username = userForRegisterDtos.Username
            };

            var createdUser = await repo.Register(userToCreate, userForRegisterDtos.Password);
            return StatusCode(201);
        }

    }
}