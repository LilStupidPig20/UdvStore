using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.IdentityModel.Tokens;
using System.Linq;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;
using DataBaseInteraction.DbExternalAccess;
using DataBaseInteraction.ResponseModels;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.IdentityModel.Tokens;
using Newtonsoft.Json;
using Newtonsoft.Json.Serialization;
using UdvStore.RequestModels;
using Microsoft.AspNetCore.Authentication;
using Microsoft.AspNetCore.Authentication.Cookies;
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