using System;
using BusinessLayer.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using UdvStore.RequestModels;

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
        [Route("getAll")]
        [Authorize(Roles = "Admin")]
        public IActionResult GetAll()
        {
            var res = coinRequestService.GetAllRequests();
            return Json(res);
        }

        [HttpPost]
        [Route("rejectRequest")]
        [Authorize(Roles = "Admin")]
        public IActionResult RejectRequest(long idRequest)
        {
            coinRequestService.RejectRequest(idRequest);
            return new OkResult();
        }
    }
}