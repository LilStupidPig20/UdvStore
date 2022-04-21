using System.Linq;
using System.Threading.Tasks;
using DataBaseInteraction.Context;
using DataBaseInteraction.DbExternalAccess;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;
using Newtonsoft.Json.Serialization;
using Microsoft.EntityFrameworkCore;

namespace UdvStore.Controllers
{
    public class TestController : Controller
    {
        private EmployeeActions repository;
        public TestController(EmployeeActions repository)
        {
            this.repository = repository;
        }

        [HttpGet]
        public IActionResult GetAllEmployees()
        {
            var list = repository.GetAll();
            return Json(list);
        }
    }
}