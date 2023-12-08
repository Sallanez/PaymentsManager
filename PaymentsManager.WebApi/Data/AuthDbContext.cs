using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;

namespace PaymentsManager.Data;

public class AuthDbContext : IdentityDbContext
{
    private readonly IConfiguration configuration;

    public AuthDbContext(DbContextOptions<AuthDbContext> options, IConfiguration configuration) : base(options)
    {
        this.configuration = configuration;
    }
    protected override void OnModelCreating(ModelBuilder builder)
    {
        base.OnModelCreating(builder);

        //Seed roles (user,admin,superAdmin)
        var adminRoleId = Guid.NewGuid().ToString();
        var userRoleId = Guid.NewGuid().ToString();

        var roles = new List<IdentityRole>
        {
            new IdentityRole
            {
                Name = "Admin",
                NormalizedName = "Admin",
                Id = adminRoleId,
                ConcurrencyStamp = adminRoleId
            },
            new IdentityRole
            {
                Name="User",
                NormalizedName="User",
                Id=userRoleId,
                ConcurrencyStamp=userRoleId
            }
        };

        //When this line gets executed Entity framework will take care of this, and when it runs this line, it will insert this roles inside the database.
        builder.Entity<IdentityRole>().HasData(roles);

        //Seed AdminUser
        var adminUserId = Guid.NewGuid().ToString();

        var adminUser = new IdentityUser
        {
            UserName = "admin@mail.com",
            Email = "admin@mail.com",
            NormalizedEmail = "admin@mail.com".ToUpper(),
            NormalizedUserName = "admin@mail.com".ToUpper(),
            Id = adminUserId
        };
        adminUser.PasswordHash = new PasswordHasher<IdentityUser>().HashPassword(adminUser, configuration.GetValue<string>("AdminUserPassword")!);
        adminUser.SecurityStamp = Guid.NewGuid().ToString().Replace("-", "").ToUpper();

        builder.Entity<IdentityUser>().HasData(adminUser);

        //Seed CollaboratorUsers
        var collaborator1UserId = Guid.NewGuid().ToString();
        var collaborator2UserId = Guid.NewGuid().ToString();

        var collaboratorUsers = new List<IdentityUser>
        {
            new() {
                Id = collaborator1UserId,
                UserName = "pepe@mail.com",
                Email = "pepe@mail.com",
                NormalizedEmail = "pepe@mail.com".ToUpper(),
                NormalizedUserName = "pepe@mail.com".ToUpper(),
                PasswordHash = new PasswordHasher<IdentityUser>().HashPassword(adminUser, configuration.GetValue<string>("Collaborator1Password@123")!),
                SecurityStamp = Guid.NewGuid().ToString().Replace("-", "").ToUpper()
            },
            new() {
                Id = collaborator2UserId,
                UserName = "alvaro@mail.com",
                Email = "alvaro@mail.com",
                NormalizedEmail = "alvaro@mail.com".ToUpper(),
                NormalizedUserName = "alvaro@mail.com".ToUpper(),
                PasswordHash = new PasswordHasher<IdentityUser>().HashPassword(adminUser, configuration.GetValue<string>("Collaborator2Password@123")!),
                SecurityStamp = Guid.NewGuid().ToString().Replace("-", "").ToUpper()
            }
        };
        builder.Entity<IdentityUser>().HasData(collaboratorUsers);

        //Add the role to adminUser
        var adminRole = new List<IdentityUserRole<string>>
        {
            new() {
                RoleId = adminRoleId,
                UserId = adminUserId,
            },
            new()
            {
                RoleId = userRoleId,
                UserId = collaborator1UserId,
            },
            new()
            {
                RoleId = userRoleId,
                UserId = collaborator2UserId,
            }
         };
        builder.Entity<IdentityUserRole<string>>().HasData(adminRole);
    }
}

