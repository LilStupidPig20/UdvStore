using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using DataBaseStorage.ResponseModels;
using Microsoft.IdentityModel.Tokens;

namespace UdvStore.Services
{
    public static class TokenGenerator
    {
        public static string Generate(LoginResponse response)
        {
            //TODO Добавить в Claims время жизни и наверное в атрибутах проверять шоб было меньше чем DateTime.Now
            var claims = new List<Claim>();
            {
                claims.Add(new Claim("username",response.Login));
                claims.Add(new Claim(ClaimTypes.Role,response.Role.ToString()));
            }
            
            var token = GetJwtToken(
                response.Login,
                AuthOptions.ISSUER,
                AuthOptions.AUDIENCE,
                TimeSpan.FromSeconds(AuthOptions.LIFETIME),
                claims.ToArray());
            //var claims = new List<Claim> { new (ClaimsIdentity.DefaultNameClaimType, str)};
            // var now = DateTime.UtcNow;
            // var jwt = new JwtSecurityToken(
            //     AuthOptions.ISSUER,
            //     AuthOptions.AUDIENCE,
            //     claims,
            //     now,
            //     now.Add(TimeSpan.FromMinutes(AuthOptions.LIFETIME)),
            //     new SigningCredentials(AuthOptions.GetSymmetricSecurityKey(),
            //         SecurityAlgorithms.HmacSha256));
            // var encodedJwt = new JwtSecurityTokenHandler().WriteToken(jwt);
            // return encodedJwt;

            return new JwtSecurityTokenHandler().WriteToken(token);
            // return new
            // {
            //     token = new JwtSecurityTokenHandler().WriteToken(token),
            //     expires = token.ValidTo
            // };
        }
        
        private static JwtSecurityToken GetJwtToken(
            string username,
            string issuer,
            string audience,
            TimeSpan expiration,
            Claim[] additionalClaims = null)
        {
            var claims = new[]
            {
                new Claim(JwtRegisteredClaimNames.Sub,username),
                // this guarantees the token is unique
                new Claim(JwtRegisteredClaimNames.Jti, Guid.NewGuid().ToString())
            };

            if (additionalClaims is object)
            {
                var claimList = new List<Claim>(claims);
                claimList.AddRange(additionalClaims);
                claims = claimList.ToArray();
            }

            var key = AuthOptions.GetSymmetricSecurityKey();
            var creds = new SigningCredentials(key, SecurityAlgorithms.HmacSha256);

            return new JwtSecurityToken(
                issuer: issuer,
                audience: audience,
                expires: DateTime.UtcNow.Add(expiration),
                claims: claims,
                signingCredentials: creds
            );
        }
    }
}