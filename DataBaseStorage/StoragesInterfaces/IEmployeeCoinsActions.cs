using System.Threading.Tasks;

namespace DataBaseStorage.StoragesInterfaces
{
    public interface IEmployeeCoinsActions
    {
        public Task<decimal> GetCurrentCoinsOfUser(long employeeId);
        public Task<decimal> AddCoins(long id, decimal coinsNumber);
        public Task<decimal> ReduceCoins(long id, decimal coinsNumber);
    }
}