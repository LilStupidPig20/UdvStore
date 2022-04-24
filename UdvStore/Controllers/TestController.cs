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
        private EmployeeActions repository;
        public TestController(EmployeeActions repository)
        {
            this.repository = repository;
        }

        [HttpGet]
        [Route("getAllEmployees")]
        [Authorize(Roles = "Admin")]
        public IActionResult GetAllEmployees()
        {
            var list = repository.GetAll();
            return Json(list);
        }
    }
}