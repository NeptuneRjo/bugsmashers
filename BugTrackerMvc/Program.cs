using BugTrackerMvc.Data;
using BugTrackerMvc.Interfaces;
using BugTrackerMvc.Repository;
using BugTrackerMvc.Services;
using Microsoft.AspNetCore.Authentication.Cookies;
using Microsoft.EntityFrameworkCore;

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
    options.DefaultScheme = CookieAuthenticationDefaults.AuthenticationScheme;
})
    .AddCookie(options =>
    {
        options.LoginPath = "/signin";
        options.LogoutPath = "/signout";
    })
    .AddGitHub(options =>
    {
        options.ClientId = builder.Configuration["GitHub:ClientId"];
        options.ClientSecret = builder.Configuration["GitHub:ClientSecret"];
    });

services.AddDbContext<DataContext>(options =>
{
    string azureConnectionString = builder.Configuration.GetConnectionString("AZURE_SQL_CONNECTIONSTRING");
    string defaultConnectionString = builder.Configuration.GetConnectionString("DefaultConnection");
    //options.UseSqlServer(azureConnectionString);
    options.UseSqlServer(defaultConnectionString);
    //options.UseInMemoryDatabase("BugTracker");
});

services.AddAutoMapper(typeof(Program));

var MyAllowSpecificOrigins = "_myAllowSpecificOrigins";

builder.Services.AddCors(options =>
{
    options.AddPolicy(name: MyAllowSpecificOrigins,
                      policy =>
                      {
                          policy.WithOrigins("https://localhost:3000");
                          policy.AllowCredentials();
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