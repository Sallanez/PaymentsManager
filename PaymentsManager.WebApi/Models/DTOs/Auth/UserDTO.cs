namespace PaymentsManager.WebApi.Models.DTOs.Auth;

public class UserDTO
{
    public string Id { get; set; } = null!;
    public string Email { get; set; } = null!;
    public string Role { get; set; } = null!;
}
