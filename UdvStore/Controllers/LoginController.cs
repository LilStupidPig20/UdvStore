using System;
using System.Text;
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
    [Route("Login")]
    public class LoginController : Controller
    {
        private readonly EmployeeActions context;
        public LoginController(EmployeeActions context)
        {
            this.context = context;
        }

        [HttpPost]
        [Route("Auth")]
        public async void Authentication([FromBody] LoginRequest loginRequest)
        {
            var login = loginRequest.Login;
            var password = loginRequest.Password;
            try
            {
                var response = context.FindUserByLoginRequest(login, password);
                if (response == null)
                {
                    Response.StatusCode = 400;
                    await Response.WriteAsync("Неверный логин или пароль");
                }
                else
                {
                    var jsonLoginResponse = CreateJsonLoginResponse(response);
                    Response.StatusCode = 200;
                    await Response.Body.WriteAsync(Encoding.UTF8.GetBytes(jsonLoginResponse));
                }
            }
            catch (Exception e)
            {
                Response.StatusCode = 500;
                await Response.WriteAsync(e.Message);
            }
        }

        private string CreateJsonLoginResponse(LoginResponse response)
        {
            var encodedJwt = TokenGenerator.Generate(response.Login);
            var serializerSettings = new JsonSerializerSettings();
            response.Token = encodedJwt;
            serializerSettings.ContractResolver = new CamelCasePropertyNamesContractResolver();
            return JsonConvert.SerializeObject(response, serializerSettings);
        }
    }
}