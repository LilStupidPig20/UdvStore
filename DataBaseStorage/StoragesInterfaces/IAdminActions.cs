using DataBaseStorage.ResponseModels;

namespace DataBaseStorage.StoragesInterfaces
{
    public interface IAdminActions
    {
        public bool IsAdminWithEnteredDataExist(string login, string password);
        public LoginResponse FindAdminByLoginRequest(string login, string password);
    }
}