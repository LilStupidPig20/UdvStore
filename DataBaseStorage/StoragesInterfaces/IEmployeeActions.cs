using DataBaseStorage.ResponseModels;

namespace DataBaseStorage.StoragesInterfaces
{
    public interface IEmployeeActions
    {
        public bool IsUserWithEnteredDataExist(string login, string password);
        public LoginResponse FindUserByLoginRequest(string login, string password);
    }
}