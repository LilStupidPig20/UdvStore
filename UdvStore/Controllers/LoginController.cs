using System;
using System.Text;
using DataBaseStorage.DbStorage;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;
using Newtonsoft.Json.Serialization;
using UdvStore.RequestModels;
using UdvStore.Services;

namespace UdvStore.Controllers
{
    public class LoginController : Controller
    {
        private readonly EmployeeActions context;
        public LoginController(EmployeeActions context)
        {
            this.context = context;
        }

        [HttpPost]
        public async void Authentication([FromBody] LoginRequest loginRequest)
        {
            var login = loginRequest.Login;
            var password = loginRequest.Password;
            var response = context.FindUserByLoginRequest(login, password);
            try
            {
                if (!context.IsUserWithEnteredDataExist(login, password))
                {
                    Response.StatusCode = 400;
                    await Response.WriteAsync("Неверный логин или пароль");
                }
                else
                {
                    var encodedJwt = TokenGenerator.Generate(login);
                    var serializerSettings = new JsonSerializerSettings();
                    response.Token = encodedJwt;
                    serializerSettings.ContractResolver = new CamelCasePropertyNamesContractResolver();
                    var jsonLoginResponse = JsonConvert.SerializeObject(response, serializerSettings);
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
    }
}