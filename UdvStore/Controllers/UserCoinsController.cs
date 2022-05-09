using System.Threading.Tasks;
using DataBaseStorage.DbStorage;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace UdvStore.Controllers
{
    [ApiController]
    [Route("coins")]
    public class UserCoinsController : Controller
    {
        private readonly EmployeeCoinsStorage context;

        public UserCoinsController(EmployeeCoinsStorage context)
        {
            this.context = context;
        }

        [HttpGet]
        [Route("get")]
        [Authorize(Roles = "User")]
        public async Task<IActionResult> GetUserCoins(long employeeId)
        {
            var quantity = await context.GetCurrentCoinsOfUser(employeeId);
            return Json(quantity);
        }
    }
}