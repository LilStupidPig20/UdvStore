using System.Threading.Tasks;

namespace DataBaseStorage.StoragesInterfaces
{
    public interface IEmployeeCoinsActions
    {
        public Task<decimal> GetCurrentCoinsOfUser(long employeeId);
        public Task<bool> AddCoins(long id, decimal coinsNumber);
        public void ReduceCoins(long id, decimal coinsNumber);
    }
}