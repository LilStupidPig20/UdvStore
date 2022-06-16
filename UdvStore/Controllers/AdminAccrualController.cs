using System.Threading.Tasks;
using BusinessLayer.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using UdvStore.RequestModels;

namespace UdvStore.Controllers
{
    [ApiController]
    [Route("adminAccrual")]
    public class AdminAccrualController : Controller
    {
        private readonly AdminAccrualService _accrualService;
        public AdminAccrualController(AdminAccrualService accrualService)
        {
            _accrualService = accrualService;
        }

        [HttpGet]
        [Route("getAllEmployees")]
        [Authorize(Roles = "Admin")]
        public async Task<IActionResult> GetAllEmployees()
        {
            var output = await _accrualService.GetAllEmployees();
            return Json(output);
        }
        
        [HttpPost]
        [Route("accrualCoinsToUsers")]
        [Authorize(Roles = "Admin")]
        public async Task<IActionResult> AccrualCoinsToUser(AccrualToUsersModel accrualRequest)
        {
            await _accrualService.AccrualCoinsToEmployees(accrualRequest.NameOfEvent, accrualRequest.Description, accrualRequest.Coins,
                accrualRequest.DateOfEvent, accrualRequest.EmployeesIds);
            return new OkResult();
        }
        
        [HttpGet]
        [Route("getAllAccrualsWithFio")]
        [Authorize(Roles = "Admin")]
        public async Task<IActionResult> GetAllAccrualsWithFio()
        {
            var output = await _accrualService.GetAllAccrualsWithFio();
            return Json(output);
        }
    }
}