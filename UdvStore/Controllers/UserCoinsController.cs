using DataBaseStorage.DbStorage;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace UdvStore.Controllers
{
    [ApiController]
    [Route("coins")]
    public class UserCoinsController : Controller
    {
        private readonly EmployeeCoinsActions context;

        public UserCoinsController(EmployeeCoinsActions context)
        {
            this.context = context;
        }

        [HttpGet]
        [Route("get")]
        [Authorize(Roles = "User")]
        public IActionResult GetUserCoins(long employeeId)
        {
            var quantity = context.GetCurrentCoinsOfUser(employeeId);
            return Json(quantity);
        }
    }
}