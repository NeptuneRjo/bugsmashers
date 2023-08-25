using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace BugTrackerMvcTesting
{
    public class TestHelpers
    {
        /// <summary>
        /// Executes a controller method and asserts that the result is an BadRequestObjectResult (HTTP 400 BAD REQUEST).
        /// </summary>
        /// <typeparam name="TController">The type of the controller.</typeparam>
        /// <param name="method">A lambda expression representing the controller method to be tested.</param>
        /// <param name="controller">The controller instance on which the method will be invoked.</param>
        /// <returns>The BadRequestObjectResult returned by the controller method.</returns>
        public static async Task<ObjectResult> ReturnsBadRequest<TController>(
            Func<TController, Task<IActionResult>> method,
            TController controller)
            where TController : ControllerBase
        {
            BadRequestObjectResult result = await method(controller) as BadRequestObjectResult;

            Assert.NotNull(result);
            Assert.Equal(StatusCodes.Status400BadRequest, result.StatusCode);
            Assert.IsType<BadRequestObjectResult>(result);

            return result;
        }
        /// <summary>
        /// Executes a controller method and asserts that the result is an UnauthorizedObjectResult (HTTP 401 UNAUTHORIZED).
        /// </summary>
        /// <typeparam name="TController">The type of the controller.</typeparam>
        /// <param name="method">A lambda expression representing the controller method to be tested.</param>
        /// <param name="controller">The controller instance on which the method will be invoked.</param>
        /// <returns>The UnauthorizedObjectResult returned by the controller method.</returns>
        public static async Task<ObjectResult> ReturnsUnauthorized<TController>(
            Func<TController, Task<IActionResult>> method,
            TController controller)
            where TController : ControllerBase
        {
            UnauthorizedObjectResult result = await method(controller) as UnauthorizedObjectResult;

            Assert.NotNull(result);
            Assert.Equal(StatusCodes.Status401Unauthorized, result.StatusCode);
            Assert.IsType<UnauthorizedObjectResult>(result);

            return result;
        }

        /// <summary>
        /// Executes a controller method and asserts that the result is an NotFoundObjectResult (HTTP 404 NOT FOUND).
        /// </summary>
        /// <typeparam name="TController">The type of the controller.</typeparam>
        /// <param name="method">A lambda expression representing the controller method to be tested.</param>
        /// <param name="controller">The controller instance on which the method will be invoked.</param>
        /// <returns>The NotFoundObjectResult returned by the controller method.</returns>
        public static async Task<ObjectResult> ReturnsNotFound<TController>(
            Func<TController, Task<IActionResult>> method,
            TController controller)
            where TController : ControllerBase
        {
            NotFoundObjectResult result = await method(controller) as NotFoundObjectResult;

            Assert.NotNull(result);
            Assert.Equal(StatusCodes.Status404NotFound, result.StatusCode);
            Assert.IsType<NotFoundObjectResult>(result);

            return result;
        }

        /// <summary>
        /// Executes a controller method and asserts that the result is an OkObjectResult (HTTP 200 OK).
        /// </summary>
        /// <typeparam name="TController">The type of the controller.</typeparam>
        /// <param name="method">A lambda expression representing the controller method to be tested.</param>
        /// <param name="controller">The controller instance on which the method will be invoked.</param>
        /// <returns>The OkObjectResult returned by the controller method.</returns>
        public static async Task<ObjectResult> ReturnsOk<TController>(
            Func<TController, Task<IActionResult>> method,
            TController controller)
            where TController : ControllerBase
        {
            OkObjectResult result = await method(controller) as OkObjectResult;

            Assert.NotNull(result);
            Assert.Equal(StatusCodes.Status200OK, result.StatusCode);
            Assert.IsType<OkObjectResult>(result);

            return result;
        }

    }
}
