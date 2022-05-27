using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using DataBaseStorage.ConfigurationDb;
using DataBaseStorage.Context;
using DataBaseStorage.DbModels;
using DataBaseStorage.StoragesInterfaces;
using Microsoft.EntityFrameworkCore;

namespace DataBaseStorage.DbStorage
{
    public class TransferCoinsHistoryStorage : BaseStorage<TransferCoinsHistory>, IForUserHistory<TransferCoinsHistory>
    {
        public TransferCoinsHistoryStorage(DBConfig dbConfig) : base(dbConfig)
        {
        }

        public async Task AddToHistory(long sender, long receiver, decimal coinsCount, string comment)
        {
            try
            {
                var historyRecord = new TransferCoinsHistory
                {
                    Id = await GetLastIdAsync() + 1,
                    Sender = sender,
                    Receiver = receiver,
                    CoinsCount = coinsCount,
                    Comment = comment,
                    TimeOfTransfer = DateTime.Now
                };

                await AddAsync(historyRecord);
            }
            catch (Exception e)
            {
                throw new Exception($"Не удалось записать в историю, {e}");
            }
        }

        public async Task<List<TransferCoinsHistory>> GetEmployeeHistory(long employeeId)
        {
            return await DbTable
                .Where(x => x.Sender.Equals(employeeId) || x.Receiver.Equals(employeeId))
                .ToListAsync();
        }
    }
}