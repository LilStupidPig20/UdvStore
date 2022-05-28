using System.Linq;
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
        private readonly OrderService _orderService;
        
        public OrdersController(OrderService orderService)
        {
            _orderService = orderService;
        }
        
        [HttpPost]
        [Route("createNewOrder")]
        [Authorize(Roles = "User")]
        public async Task<IActionResult> CreateNewOrder(CreateOrderRequest order)
        {
            var orderTuple = order.Products
                .Select(e => (e.Id, e.Count, e.Size)).ToList();
            var res= await _orderService.CreateOrder(order.EmployeeId, orderTuple);
            return Json(res);
        }
        
        [HttpGet]
        [Route("getClosedOrders")]
        [Authorize(Roles = "Admin")]
        public async Task<IActionResult> GetClosedOrders()
        {
            var res = await _orderService.GetClosedOrders();
            return Json(res);
        }
        
        [HttpGet]
        [Route("getOrdersInWork")]
        [Authorize(Roles = "Admin")]
        public async Task<IActionResult> GetOrdersInWork()
        {
            var res = await _orderService.GetOpenOrders();
            return Json(res);
        }
        
        [HttpPost]
        [Route("cancelOrderByAdmin")]
        [Authorize(Roles = "Admin")]
        public async Task<IActionResult> AdminCancelOrder(long idOrder, string cancellationComment)
        {
            await _orderService.CancelOrder(idOrder, cancellationComment);
            return new OkResult();
        }
        
        [HttpPost]
        [Route("cancelOrderByEmployee")]
        [Authorize(Roles = "User")]
        public async Task<IActionResult> UserCancelOrder(long idOrder, string cancellationComment)
        {
            await _orderService.CancelOrder(idOrder, cancellationComment);
            return new OkResult();
        }
        
        [HttpPost]
        [Route("changeToAccepted")]
        [Authorize(Roles = "Admin")]
        public async Task<IActionResult> ChangeToAccepted(long idOrder)
        {
            await _orderService.ChangeStatusToAccepted(idOrder);
            return new OkResult();
        }
        
        [HttpPost]
        [Route("changeToReady")]
        [Authorize(Roles = "Admin")]
        public async Task<IActionResult> ChangeToReady(long idOrder)
        {
            await _orderService.ChangeStatusToReady(idOrder);
            return new OkResult();
        }
        
        [HttpPost]
        [Route("ChangeToReceived")]
        [Authorize(Roles = "Admin")]
        public async Task<IActionResult> ChangeToReceived(long idOrder)
        {
            await _orderService.ChangeStatusToReceived(idOrder);
            return new OkResult();
        }
        
        [HttpGet]
        [Route("getEmployeeHistory")]
        [Authorize(Roles = "User")]
        public async Task<IActionResult> GetEmployeeHistory(long idEmployee)
        {
            var res = await _orderService.GetEmployeeHistory(idEmployee);
            return Json(res);
        }
    }
}