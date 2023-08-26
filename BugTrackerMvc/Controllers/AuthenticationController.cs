using BugTrackerMvc.Extensions;
using Microsoft.AspNetCore.Authentication;
using Microsoft.AspNetCore.Authentication.Cookies;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.Security.Claims;

namespace BugTrackerMvc.Controllers
{
    public class LoginBody
    {
        public string Provider { get; set; }
    }

    [Route("api/[controller]")]
    [ApiController]
    public class AuthenticationController : ControllerBase
    {
        [HttpGet]
        public async Task<IActionResult> Get() {
            List<Dictionary<string, string>> providers = new();

            foreach (var provider in await HttpContext.GetExternalProvidersAsync())
            {
                providers.Add(new Dictionary<string, string>() {
                    { "name", provider.Name },
                    { "display_name", provider.DisplayName }
                });
            }

            return Ok(providers);
        }

        [HttpPost("signin")]
        public async Task<IActionResult> Post([FromForm] LoginBody body)
        {
            // Note: the "provider" parameter corresponds to the external
            // authentication provider choosen by the user agent.
            if (string.IsNullOrWhiteSpace(body.Provider))
            {
                return BadRequest();
            }

            if (!await HttpContext.IsProviderSupportedAsync(body.Provider))
            {
                return BadRequest();
            }

            // Instruct the middleware corresponding to the requested external identity
            // provider to redirect the user agent to its own authorization endpoint.
            // Note: the authenticationScheme parameter must match the value configured in Startup.cs
            return Challenge(new AuthenticationProperties { RedirectUri = "https://localhost:3000/" }, body.Provider);
        }

        [HttpGet("user")]
        [AllowAnonymous]
        public IActionResult GetUser()
        {
            var name = User.FindFirst(ClaimTypes.Name);

            if (name != null)
            {
                var user = new Dictionary<string, string>()
                {
                    { "Name", name.Value }
                };

                return Ok(user);
            }

            return BadRequest("User must be signed in");
        }

        [HttpGet("signout")]
        [HttpPost("signout")]
        public IActionResult SignOutCurrentUser()
        {
            // Instruct the cookies middleware to delete the local cookie created
            // when the user agent is redirected from the external identity provider
            // after a successful authentication flow (e.g Google or Facebook).
            return SignOut(new AuthenticationProperties {  },
                CookieAuthenticationDefaults.AuthenticationScheme);
        }
    }
}
