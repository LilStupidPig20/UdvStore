using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using DataBaseStorage.DbStorage;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;
using Newtonsoft.Json.Serialization;

namespace UdvStore.Controllers
{
    [ApiController]
    [Route("test")]
    public class TestController : Controller
    {
        private EmployeesStorage repository;
        public TestController(EmployeesStorage repository)
        {
            this.repository = repository;
        }

        [HttpGet]
        [Route("getAllEmployees")]
        [Authorize(Roles = "Admin")]
        public async Task<IActionResult> GetAllEmployees()
        {
            var list = await repository.GetAllAsync();
            return Json(list);
        }
    }
}