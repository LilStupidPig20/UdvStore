using System.Threading.Tasks;
using DataBaseInteraction.DbExternalAccess;
using Microsoft.AspNetCore.Mvc;

namespace UdvStore.Controllers
{
    public class UserCoinsController : Controller
    {
        private readonly EmployeeCoinsActions context;

        public UserCoinsController(EmployeeCoinsActions context)
        {
            this.context = context;
        }

        [HttpGet]
        public IActionResult GetUserCoins(long employeeId)
        {
            var quantity = context.GetCurrentCoinsOfUser(employeeId);
            return Json(quantity);
        }
    }
}