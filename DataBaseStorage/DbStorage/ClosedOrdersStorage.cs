using DataBaseStorage.ConfigurationDb;
using DataBaseStorage.Context;
using DataBaseStorage.DbModels;

namespace DataBaseStorage.DbStorage
{
    public class ClosedOrdersStorage : BaseStorage<ClosedOrders>
    {
        public ClosedOrdersStorage(DBConfig dbConfig) : base(dbConfig)
        {
        }
    }
}