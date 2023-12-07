using BugTracker.BLL.Services;
using BugTracker.BLL.Services.IServices;
using BugTracker.BLL.Utilities.AutoMapper;
using Microsoft.AspNetCore.Authentication.Cookies;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.IdentityModel.Tokens;
using System.Text;

namespace BugTracker.BLL
{
    public static class DependencyInjection
    {
        public static void RegisterBLLDependencies(this IServiceCollection services, IConfiguration Configuration)
        {
            services.AddScoped<IIssueService, IssueService>();
            services.AddScoped<IProjectService, ProjectService>();

            services.AddAutoMapper(typeof(AutoMapperProfiles));

            // Authentication Policies
            services.AddAuthentication(options =>
            {
                options.DefaultAuthenticateScheme = CookieAuthenticationDefaults.AuthenticationScheme;

                options.DefaultSignInScheme = CookieAuthenticationDefaults.AuthenticationScheme;

                options.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
            })
                .AddCookie()
               .AddJwtBearer(options =>
               {
                   SymmetricSecurityKey key = new(Encoding.UTF8.GetBytes(Configuration["Jwt:Key"]));

                   options.RequireHttpsMetadata = false;
                   options.SaveToken = true;
                   options.TokenValidationParameters = new TokenValidationParameters
                   {
                       ValidateIssuerSigningKey = true,
                       IssuerSigningKey = key,
                       ValidateIssuer = false,
                       ValidateAudience = false
                   };
               })
               .AddGitHub(options =>
               {
                   options.ClientId = Configuration["GitHub:ClientId"];
                   options.ClientSecret = Configuration["GitHub:ClientSecret"];
               });

            services.AddAuthorization();

            // CORs
            services.AddCors(options =>
            {
                options.AddPolicy(name: "_myAllowSpecificOrigins",
                                  policy =>
                                  {
                                      policy.WithOrigins(
                                          "https://localhost:3000", 
                                          "http://localhost:3000");
                                      policy.AllowCredentials();
                                      policy.AllowAnyMethod();
                                      policy.AllowAnyHeader();
                                  });
            });
        }
    }
}

