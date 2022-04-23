using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using Microsoft.IdentityModel.Tokens;

namespace UdvStore.Services
{
    public static class TokenGenerator
    {
        public static string Generate(string str)
        {
            var claims = new List<Claim> { new (ClaimsIdentity.DefaultNameClaimType, str)};
            var now = DateTime.UtcNow;
            var jwt = new JwtSecurityToken(
                AuthOptions.ISSUER,
                AuthOptions.AUDIENCE,
                claims,
                now,
                now.Add(TimeSpan.FromMinutes(AuthOptions.LIFETIME)),
                new SigningCredentials(AuthOptions.GetSymmetricSecurityKey(),
                    SecurityAlgorithms.HmacSha256));
            var encodedJwt = new JwtSecurityTokenHandler().WriteToken(jwt);
            return encodedJwt;
        }
    }
}