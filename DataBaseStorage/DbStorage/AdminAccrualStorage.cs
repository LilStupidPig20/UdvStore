using System;
using System.Threading.Tasks;
using DataBaseStorage.ConfigurationDb;
using DataBaseStorage.Context;
using DataBaseStorage.DbModels;

namespace DataBaseStorage.DbStorage
{
    public class AdminAccrualStorage : BaseStorage<AdminAccrual>
    {
        public AdminAccrualStorage(DBConfig dbConfig) : base(dbConfig)
        {
        }

        public async Task<long> AddNewAccrual(string nameOfEvent, string description, decimal coinsNumber, DateTime dateOfEvent)
        {
            var accrual = new AdminAccrual
            {
                Id = await GetLastIdAsync() + 1,
                Description = description,
                DateOfEvent = dateOfEvent,
                Coins = coinsNumber,
                TimeSent = DateTime.Now,
                NameOfEvent = nameOfEvent
            };
            await AddAsync(accrual);
            return accrual.Id;
        }
    }
}