using System;
using System.Text;
using BusinessLayer.Services;
using DataBaseStorage.DbStorage;
using DataBaseStorage.ResponseModels;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;
using Newtonsoft.Json.Serialization;
using UdvStore.RequestModels;
using UdvStore.Services;

namespace UdvStore.Controllers
{
    [ApiController]
    [Route("login")]
    public class LoginController : Controller
    {
        private readonly AuthService authService;
        public LoginController(AuthService authService)
        {
            this.authService = authService;
        }

        [HttpPost]
        [Route("authenticate")]
        public void Authentication([FromBody] LoginRequest loginRequest)
        {
            var login = loginRequest.Login;
            var password = loginRequest.Password;
            try
            {
                var response = authService.CheckUserByLoginRequest(login, password);
                if (response == null)
                {
                    Response.StatusCode = 400; 
                    Response.WriteAsync("Неверный логин или пароль");
                }
                else
                {
                    var token = TokenGenerator.Generate(response);
                    response.Token = token;
                    var jsonLoginResponse = CreateJsonLoginResponse(response);
                    Response.StatusCode = 200;
                    Response.Body.WriteAsync(Encoding.UTF8.GetBytes(jsonLoginResponse));
                }
            }
            catch (Exception e)
            {
                Response.StatusCode = 500; 
                Response.WriteAsync(e.Message);
            }
        }

        private string CreateJsonLoginResponse(LoginResponse response)
        {
            var serializerSettings = new JsonSerializerSettings();
            serializerSettings.ContractResolver = new CamelCasePropertyNamesContractResolver();
            return JsonConvert.SerializeObject(response, serializerSettings);
        }
    }
}