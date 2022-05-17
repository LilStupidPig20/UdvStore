using DataBaseStorage.ConfigurationDb;
using DataBaseStorage.Context;
using DataBaseStorage.DbModels;

namespace DataBaseStorage.DbStorage
{
    public class ClothesProductStorage : BaseStorage<ClothesProduct>
    {
        public ClothesProductStorage(DBConfig dbConfig) : base(dbConfig)
        {
        }
    }
}