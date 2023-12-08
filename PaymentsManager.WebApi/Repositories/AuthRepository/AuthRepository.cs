using Microsoft.AspNetCore.Identity;
using PaymentsManager.Data;
using PaymentsManager.WebApi.Models.DTOs.Auth;

namespace PaymentsManager.WebApi.Repositories.AuthRepository;

public class AuthRepository : IAuthRepository
{
    private readonly AuthDbContext authDbContext;
    private readonly UserManager<IdentityUser> userManager;

    public AuthRepository(AuthDbContext authDbContext, UserManager<IdentityUser> userManager)
    {
        this.authDbContext = authDbContext;
        this.userManager = userManager;
    }

    public async Task<UserDTO?> PasswordAndEmailVerificationAsync(LoginRequestDTO model)
    {
        if (model.Email != null && model.Password != null)
        {
            IdentityUser? userFromDb = authDbContext.Users.FirstOrDefault(user => user.UserName!.ToLower() == model.Email.ToLower());
            if (userManager == null)
            {
                return null;
            }
            bool isPasswordValid = await userManager.CheckPasswordAsync(userFromDb!, model.Password);

            if (isPasswordValid)
            {
                var role = await userManager.GetRolesAsync(userFromDb!);
                var user = new UserDTO
                {
                    Id = userFromDb!.Id.ToString(),
                    Email = userFromDb.Email!,
                    Role = role.FirstOrDefault()!
                };

                return user;
            }
        }
        return null;
    }
}
