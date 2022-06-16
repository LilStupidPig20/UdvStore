using System.Threading.Tasks;
using DataBaseStorage.ResponseModels;

namespace DataBaseStorage.StoragesInterfaces
{
    public interface IEmployeeActions
    {
        public Task<bool> IsUserWithEnteredDataExist(string login, string password);
        public Task<LoginResponse> FindUserByLoginRequest(string login, string password);
    }
}