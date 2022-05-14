using System;
using System.Threading.Tasks;
using BusinessLayer.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace UdvStore.Controllers
{
    [ApiController]
    [Route("coinRequest")]
    public class CoinsRequestController : Controller
    {
        private readonly CoinRequestService coinRequestService;

        public CoinsRequestController(CoinRequestService coinRequestService)
        {
            this.coinRequestService = coinRequestService;
        }

        [HttpPost]
        [Route("sendToAdmin")]
        [Authorize(Roles = "User")]
        public async Task<IActionResult> SendRequestToAdmin(string eventEntered, string description,
            long employeeId, DateTime time)
        {
            await coinRequestService.CreateRequest(eventEntered, description,
                employeeId, time);
            return new OkResult();
        }

        [HttpPost]
        [Route("acceptRequest")]
        [Authorize(Roles = "Admin")]
        public async Task<IActionResult> AcceptRequest(long idRequest, decimal coinsNumber)
        {
            await coinRequestService.AcceptRequest(idRequest, coinsNumber);
            return new OkResult();
        }

        [HttpGet]
        [Route("getOpenRequests")]
        [Authorize(Roles = "Admin")]
        public async Task<IActionResult> GetOpenRequests()
        {
            var res = await coinRequestService.GetOpenRequests();
            return Json(res);
        }
        
        [HttpGet]
        [Route("getClosedRequests")]
        [Authorize(Roles = "Admin")]
        public async Task<IActionResult> GetClosedRequests()
        {
            var res = await coinRequestService.GetClosedRequests();
            return Json(res);
        }

        [HttpPost]
        [Route("rejectRequest")]
        [Authorize(Roles = "Admin")]
        public async Task<IActionResult> RejectRequest(long idRequest, string comment)
        {
            await coinRequestService.RejectRequest(idRequest, comment);
            return new OkResult();
        }

        [HttpGet]
        [Route("getFullRequest")]
        [Authorize(Roles = "Admin")]
        public async Task<IActionResult> GetRequest(long idRequest)
        {
            var res = await coinRequestService.GetClosedRequestInfo(idRequest);
            return Json(res);
        }
    }
}