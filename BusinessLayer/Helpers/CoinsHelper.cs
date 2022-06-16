using System.Threading.Tasks;
using BusinessLayer.StorageActions;
using DataBaseStorage.Context;
using DataBaseStorage.DbStorage;

namespace BusinessLayer.Helpers
{
    public class CoinsHelper
    {
        private readonly EmployeeCoinsStorage storage;
        public CoinsHelper(IStorageFactory factory)
        {
            storage = factory.CreateEmployeeCoinsStorage();
        }
        
        public async Task<decimal> GetBalance(long employee)
        {
            return await storage.GetCurrentCoinsOfUser(employee);
        }
        
        public async Task<decimal> ReduceEmployeeCoins(long employee, decimal coinsCount)
        {
            return await storage.ReduceCoins(employee, coinsCount);
        }
        
        public async Task<decimal> AddEmployeeCoins(long employee, decimal coinsCount)
        {
            return await storage.AddCoins(employee, coinsCount);
        }
    }
}