using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using BusinessLayer.Services;
using DataBaseStorage.Enums;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using UdvStore.RequestModels;

namespace UdvStore.Controllers
{
    [ApiController]
    [Route("adminAccrual")]
    public class AdminAccrualController : Controller
    {
        private readonly AdminAccrualService accrualService;
        public AdminAccrualController(AdminAccrualService accrualService)
        {
            this.accrualService = accrualService;
        }

        [HttpGet]
        [Route("getAllEmployees")]
        [Authorize(Roles = "Admin")]
        public async Task<IActionResult> GetAllEmployees()
        {
            var output = await accrualService.GetAllEmployees();
            return Json(output);
        }
        
        [HttpPost]
        [Route("accrualCoinsToUsers")]
        [Authorize(Roles = "Admin")]
        public async Task<IActionResult> AccrualCoinsToUser(AccrualToUsersModel accrualRequest)
        {
            await accrualService.AccrualCoinsToEmployees(accrualRequest.NameOfEvent, accrualRequest.Description, accrualRequest.Coins,
                accrualRequest.DateOfEvent, accrualRequest.EmployeesIds);
            return new OkResult();
        }
        
        [HttpGet]
        [Route("getAllAccrualsWithFio")]
        [Authorize(Roles = "Admin")]
        public async Task<IActionResult> GetAllAccrualsWithFio()
        {
            var output = await accrualService.GetAllAccrualsWithFio();
            return Json(output);
        }
    }
}