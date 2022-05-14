using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using BusinessLayer.Services;
using DataBaseStorage.Enums;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

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
        [Route("accrualCoinsToUser")]
        [Authorize(Roles = "Admin")]
        public async Task<IActionResult> AccrualCoinsToUser(List<long> employeesIds, string description,
            decimal coins, DateTime dateOfEvent)
        {
            await accrualService.AccrualCoinsToEmployees(description, coins,
                dateOfEvent, employeesIds);
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