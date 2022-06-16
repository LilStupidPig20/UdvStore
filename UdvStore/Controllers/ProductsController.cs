using System;
using System.Threading.Tasks;
using BusinessLayer.Services;
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
        private readonly ProductService productService;
        public ProductsController(ProductService productService)
        {
            this.productService = productService;
        }

        [HttpGet]
        [Route("getAll")]
        public async Task<IActionResult> GetAllProducts()
        {
            var products = await productService.GetAllProducts();
            return Json(products);
        }
        
        [HttpGet]
        [Route("getFullInfo")]
        public async Task<IActionResult> GetClothesFullInfo(long idProduct)
        {
            var info = await productService.GetClothesItemInfo(idProduct);
            return Json(info);
        }
    }
}