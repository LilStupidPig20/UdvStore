using DataBaseStorage.DbStorage;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;
using Newtonsoft.Json.Serialization;

namespace UdvStore.Controllers
{
    [ApiController]
    [Route("Store")]
    public class ProductsController : Controller
    {
        private ProductsActions context;
        public ProductsController(ProductsActions context)
        {
            this.context = context;
        }

        [HttpGet]
        [Route("GetAll")]
        public IActionResult GetAllProducts()
        {
            var products = context.GetProductsWithoutDescription();
            return Json(products);
        }
    }
}