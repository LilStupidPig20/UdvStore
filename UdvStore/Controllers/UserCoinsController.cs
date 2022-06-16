using System.Threading.Tasks;
using BusinessLayer.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace UdvStore.Controllers
{
    [ApiController]
    [Route("coins")]
    public class UserCoinsController : Controller
    {
        private readonly UserCoinsService _userCoinsService;
        public UserCoinsController(UserCoinsService userCoinsService)
        {
            _userCoinsService = userCoinsService;
        }

        [HttpGet]
        [Route("get")]
        [Authorize(Roles = "User")]
        public async Task<IActionResult> GetUserCoins(long employeeId)
        {
            var balance = await _userCoinsService.GetCurrentUserCoins(employeeId);
            return Json(balance);
        }
        
        [HttpPost]
        [Route("transferToAnotherUser")]
        [Authorize(Roles = "User")]
        public async Task<IActionResult> TransferCoins(long currentEmployeeId, long receiver, decimal coinsCount,
            string comment)
        {
            await _userCoinsService.TransferCoins(currentEmployeeId, receiver, coinsCount, comment);
            return new OkResult();
        }
        
        [HttpGet]
        [Route("getEmployeesToTransfer")]
        [Authorize(Roles = "User")]
        public async Task<IActionResult> GetEmployeesToTransfer(long currentEmployeeId)
        {
            var res = await _userCoinsService.GetAllEmployees(currentEmployeeId);
            return Json(res);
        }
        
        [HttpGet]
        [Route("getHistoryOfEmployee")]
        [Authorize(Roles = "User")]
        public async Task<IActionResult> GetHistoryForEmployee(long employeeId)
        {
            var res = await _userCoinsService.GetHistory(employeeId);
            return Json(res);
        }
    }
}