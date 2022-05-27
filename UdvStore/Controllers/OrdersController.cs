using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using BusinessLayer.Services;
using DataBaseStorage.Enums;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using UdvStore.RequestModels;

namespace UdvStore.Controllers
{
    [ApiController]
    [Route("order")]
    public class OrdersController : Controller
    {
        private readonly OrderService orderService;
        
        public OrdersController(OrderService orderService)
        {
            this.orderService = orderService;
        }
        
        [HttpPost]
        [Route("createNewOrder")]
        [Authorize(Roles = "User")]
        public async Task<IActionResult> CreateNewOrder(CreateOrderRequest order)
        {
            var orderTuple = order.Products.Select(e => (e.Id, e.Count, e.Size)).ToList();
            await orderService.CreateOrder(order.EmployeeId, orderTuple);
            return new OkResult();
        }
        
        [HttpGet]
        [Route("getClosedOrders")]
        [Authorize(Roles = "Admin")]
        public async Task<IActionResult> GetClosedOrders()
        {
            var res = await orderService.GetClosedOrders();
            return Json(res);
        }
        
        [HttpGet]
        [Route("getOrdersInWork")]
        [Authorize(Roles = "Admin")]
        public async Task<IActionResult> GetOrdersInWork()
        {
            var res = await orderService.GetOpenOrders();
            return Json(res);
        }
        
        [HttpPost]
        [Route("cancelOrderByAdmin")]
        [Authorize(Roles = "Admin")]
        public async Task<IActionResult> AdminCancelOrder()
        {
            throw new NotImplementedException();
        }
        
        [HttpPost]
        [Route("cancelOrderByEmployee")]
        [Authorize(Roles = "User")]
        public async Task<IActionResult> UserCancelOrder()
        {
            throw new NotImplementedException();
        }
        
        [HttpPost]
        [Route("changeToAccepted")]
        [Authorize(Roles = "Admin")]
        public async Task<IActionResult> ChangeToAccepted()
        {
            throw new NotImplementedException();
        }
        
        [HttpPost]
        [Route("changeToReady")]
        [Authorize(Roles = "Admin")]
        public async Task<IActionResult> ChangeToReady()
        {
            throw new NotImplementedException();
        }
        
        [HttpPost]
        [Route("ChangeToReceived")]
        [Authorize(Roles = "User")]
        public async Task<IActionResult> ChangeToReceived()
        {
            throw new NotImplementedException();
        }
        
        [HttpGet]
        [Route("getEmployeeHistory")]
        [Authorize(Roles = "User")]
        public async Task<IActionResult> GetEmployeeHistory()
        {
            throw new NotImplementedException();
        }
    }
}