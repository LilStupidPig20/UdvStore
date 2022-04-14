using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;
using Newtonsoft.Json.Serialization;
using UdvStore.Context;

namespace UdvStore.Controllers
{
    public class TestController : Controller
    {
        private PostgresContext context;
        
        public TestController(PostgresContext context)
        {
            this.context = context;
        }

        [HttpGet]
        public async Task<IActionResult> GetAllEmployees()
        {
            //TODO: чо за хуйня, кириллица не сериализуется в Json нормально...
            var employees = context.Employees.Where(x => x.Id != 0).ToList();
            return Json(employees);
        }
    }
}