using System.Threading.Tasks;
using DataBaseStorage.DbStorage;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;
using Newtonsoft.Json.Serialization;

namespace UdvStore.Controllers
{
    [ApiController]
    [Route("store")]
    public class ProductsController : Controller
    {
        private ProductsStorage context;
        public ProductsController(ProductsStorage context)
        {
            this.context = context;
        }

        [HttpGet]
        [Route("getAll")]
        public async Task<IActionResult> GetAllProducts()
        {
            var products = await context.GetProductsWithoutDescription();
            return Json(products);
        }
    }
}