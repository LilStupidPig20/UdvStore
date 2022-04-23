using System.Text;
using Microsoft.IdentityModel.Tokens;

namespace UdvStore.Services
{
    public class AuthOptions
    {
        public const string ISSUER = "Team3410"; // издатель токена
        public const string AUDIENCE = "DarthVader"; // потребитель токена
        const string KEY = "there_is_the_way";   // ключ для шифрации
        public const int LIFETIME = 1 * 60 * 24 * 14; // время жизни токена - 1 минута
        public static SymmetricSecurityKey GetSymmetricSecurityKey()
        {
            return new SymmetricSecurityKey(Encoding.ASCII.GetBytes(KEY));
        }
    }
}