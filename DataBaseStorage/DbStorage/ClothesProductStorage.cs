using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using DataBaseStorage.ConfigurationDb;
using DataBaseStorage.Context;
using DataBaseStorage.DbModels;
using Microsoft.EntityFrameworkCore;

namespace DataBaseStorage.DbStorage
{
    public class ClothesProductStorage : BaseStorage<ClothesProduct>
    {
        public ClothesProductStorage(DBConfig dbConfig) : base(dbConfig)
        {
        }

        public async Task<List<ClothesProduct>> GetFullInfo(long idProduct)
        {
            try
            {
                return await DbTable.Where(x => x.Product.Equals(idProduct)).ToListAsync();
            }
            catch (Exception e)
            {
                throw new Exception($"Невозможно получить размеры для данного товара {e}");
            }
        }
    }
}