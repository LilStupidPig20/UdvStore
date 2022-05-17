using DataBaseStorage.ConfigurationDb;
using DataBaseStorage.Context;
using DataBaseStorage.DbModels;

namespace DataBaseStorage.DbStorage
{
    public class OrdersInWorkStorage : BaseStorage<OrdersInWork>
    {
        public OrdersInWorkStorage(DBConfig dbConfig) : base(dbConfig)
        {
        }
    }
}