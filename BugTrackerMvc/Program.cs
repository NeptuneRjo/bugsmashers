using BugTrackerMvc.Data;
using BugTrackerMvc.Extensions;
using BugTrackerMvc.Interfaces;
using BugTrackerMvc.Repository;
using BugTrackerMvc.Services;
using Microsoft.AspNetCore.Authentication.Cookies;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using System.Text;

var builder = WebApplication.CreateBuilder(args);
IServiceCollection services = builder.Services;

// Add services to the container.

services.AddControllersWithViews();

// Data
services.AddScoped<IDataContext, DataContext>();

// Repositories
services.AddScoped<IIssueRepository, IssueRepository>();
services.AddScoped<IProjectRepository, ProjectRepository>();

// Services
services.AddScoped<IIssueService, IssueService>();
services.AddScoped<IProjectService, ProjectService>();

services.AddAuthentication(options =>
{
    options.DefaultAuthenticateScheme = CookieAuthenticationDefaults.AuthenticationScheme;
    options.DefaultSignInScheme = CookieAuthenticationDefaults.AuthenticationScheme;
    options.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
})
   .AddCookie()
   .AddJwtBearer(options =>
   {
       SymmetricSecurityKey key = new(Encoding.UTF8.GetBytes(builder.Configuration["Jwt:Key"]));

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
        options.ClientId = builder.Configuration["GitHub:ClientId"];
        options.ClientSecret = builder.Configuration["GitHub:ClientSecret"];
   });

services.AddAuthorization();

services.AddDbContext<DataContext>(options =>
{
    string azureConnectionString = builder.Configuration.GetConnectionString("AZURE_SQL_CONNECTIONSTRING");
    string defaultConnectionString = builder.Configuration.GetConnectionString("DefaultConnection");
    options.UseSqlServer(azureConnectionString);
});

services.AddAutoMapper(typeof(Program));

var MyAllowSpecificOrigins = "_myAllowSpecificOrigins";

builder.Services.AddCors(options =>
{
    options.AddPolicy(name: MyAllowSpecificOrigins,
                      policy =>
                      {
                          policy.WithOrigins("https://localhost:3000", "https://bugsmashers.onrender.com", "http://localhost:4000", "http://localhost:5193/");
                          policy.AllowCredentials();
                          policy.AllowAnyMethod();
                          policy.AllowAnyHeader();
                      });
});

var app = builder.Build();

// Configure the HTTP request pipeline.
if (!app.Environment.IsDevelopment())
{
    app.UseExceptionHandler("/Home/Error");
    // The default HSTS value is 30 days. You may want to change this for production scenarios, see https://aka.ms/aspnetcore-hsts.
    app.UseHsts();
}

app.UseHttpsRedirection();
app.UseStaticFiles();

app.UseRouting();

app.UseCors(MyAllowSpecificOrigins);

app.UseAuthentication();
app.UseAuthorization();

app.MapControllerRoute(
    name: "default",
    pattern: "{controller=Home}/{action=Index}/{id?}");

app.Run();

// Reference for WebApplicationFactory
public partial class Program { }