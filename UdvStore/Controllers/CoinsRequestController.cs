using System;
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
        public IActionResult SendRequestToAdmin(string eventEntered, string description,
            long employeeId, DateTime time)
        {
            coinRequestService.CreateRequest(eventEntered, description,
                employeeId, time);
            return new OkResult();
        }

        [HttpPost]
        [Route("acceptRequest")]
        [Authorize(Roles = "Admin")]
        public IActionResult AcceptRequest(long idRequest, decimal coinsNumber)
        {
            coinRequestService.AcceptRequest(idRequest, coinsNumber);
            return new OkResult();
        }

        [HttpGet]
        [Route("getOpenRequests")]
        [Authorize(Roles = "Admin")]
        public IActionResult GetOpenRequests()
        {
            var res = coinRequestService.GetOpenRequests();
            return Json(res);
        }
        
        [HttpGet]
        [Route("getClosedRequests")]
        [Authorize(Roles = "Admin")]
        public IActionResult GetClosedRequests()
        {
            var res = coinRequestService.GetClosedRequests();
            return Json(res);
        }

        [HttpPost]
        [Route("rejectRequest")]
        [Authorize(Roles = "Admin")]
        public IActionResult RejectRequest(long idRequest, string comment)
        {
            coinRequestService.RejectRequest(idRequest, comment);
            return new OkResult();
        }

        [HttpGet]
        [Route("getFullRequest")]
        [Authorize(Roles = "Admin")]
        public IActionResult GetRequest(long idRequest)
        {
            var res = coinRequestService.GetRequest(idRequest);
            return Json(res);
        }
    }
}