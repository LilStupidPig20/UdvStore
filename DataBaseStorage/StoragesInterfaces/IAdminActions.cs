using System.Threading.Tasks;
using DataBaseStorage.ResponseModels;

namespace DataBaseStorage.StoragesInterfaces
{
    public interface IAdminActions
    {
        public Task<bool> IsAdminWithEnteredDataExist(string login, string password);
        public Task<LoginResponse> FindAdminByLoginRequest(string login, string password);
    }
}