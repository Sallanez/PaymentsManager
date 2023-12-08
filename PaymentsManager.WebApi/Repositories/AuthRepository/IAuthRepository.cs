using PaymentsManager.WebApi.Models.DTOs.Auth;

namespace PaymentsManager.WebApi.Repositories.AuthRepository;

public interface IAuthRepository
{
    Task<UserDTO?> PasswordAndEmailVerificationAsync(LoginRequestDTO model);
}
