using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using BusinessLayer.Services;
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
        public async Task<IActionResult> CreateNewOrder(long employeeId, List<CreateOrderRequest> order)
        {
            throw new NotImplementedException();
        }
        
        [HttpGet]
        [Route("getClosedOrders")]
        [Authorize(Roles = "Admin")]
        public async Task<IActionResult> GetClosedOrders()
        {
            throw new NotImplementedException();
        }
        
        [HttpGet]
        [Route("getOrdersInWork")]
        [Authorize(Roles = "Admin")]
        public async Task<IActionResult> GetOrdersInWork()
        {
            throw new NotImplementedException();
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