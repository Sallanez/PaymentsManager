using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.IdentityModel.Tokens;
using PaymentsManager.WebApi.Models.ApiResponse;
using PaymentsManager.WebApi.Models.DTOs.Auth;
using PaymentsManager.WebApi.Repositories.AuthRepository;
using System.IdentityModel.Tokens.Jwt;
using System.Net;
using System.Security.Claims;
using System.Text;

namespace PaymentsManager.WebApi.Controllers;

[Route("api/auth")]
[ApiController]
public class AuthController : ControllerBase
{
    private readonly IAuthRepository authRepository;
    private readonly ApiResponse apiResponse;
    private string secretKey;
    private readonly UserManager<IdentityUser> userManager;
    private readonly RoleManager<IdentityRole> roleManager;

    public AuthController(IAuthRepository authRepository,IConfiguration configuration, UserManager<IdentityUser> userManager, RoleManager<IdentityRole> roleManager)
    {
        this.authRepository = authRepository;
        apiResponse = new ApiResponse();
        secretKey = configuration.GetValue<string>("ApiSettings:Secret")!;
        this.userManager = userManager;
        this.roleManager = roleManager;
    }

    [HttpPost("login")]
    public async Task<IActionResult> Login([FromBody] LoginRequestDTO model)
    {
        UserDTO? userFromDb = await authRepository.PasswordAndEmailVerificationAsync(model);
        if (userFromDb == null)
        {
            apiResponse.Result = new LoginResponseDTO();
            apiResponse.IsSuccess = false;
            apiResponse.ErrorMessages.Add("Invalid email or password");
            apiResponse.StatusCode = HttpStatusCode.BadRequest;
            return BadRequest(apiResponse);
        }
        //Here we generete our JWT token
        JwtSecurityTokenHandler tokenHandler = new();
        byte[] key = Encoding.ASCII.GetBytes(secretKey);
        SecurityTokenDescriptor tokenDescriptor = new()
        {
            Subject = new ClaimsIdentity(new Claim[]
            {
                new("fullName", userFromDb.Email),
                new("id",userFromDb.Id),
                new(ClaimTypes.Email, userFromDb.Email),
                new(ClaimTypes.Role, userFromDb.Role)
            }),
            Expires = DateTime.UtcNow.AddDays(7),
            SigningCredentials = new SigningCredentials(new SymmetricSecurityKey(key), SecurityAlgorithms.HmacSha256Signature)
        };
        SecurityToken token = tokenHandler.CreateToken(tokenDescriptor);
        LoginResponseDTO loginReponse = new()
        {
            Email = userFromDb.Email,
            Token = tokenHandler.WriteToken(token),
        };
        apiResponse.StatusCode = HttpStatusCode.OK;
        apiResponse.IsSuccess = true;
        apiResponse.Result = loginReponse;
        return Ok(apiResponse);
    }
}
