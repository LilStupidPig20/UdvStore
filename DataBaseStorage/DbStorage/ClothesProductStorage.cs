using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using DataBaseStorage.ConfigurationDb;
using DataBaseStorage.Context;
using DataBaseStorage.DbModels;
using DataBaseStorage.Enums;
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
        
        public async Task<long> ReduceProductQuantity(long id, long quantity, Sizes size)
        {
            try
            {
                var product = await DbTable
                    .FirstOrDefaultAsync(x => x.Product.Equals(id) && x.Size.Equals(size));
                if (product.Quantity < quantity)
                    throw new ArgumentException($"Недостаточно товара в наличии");
                if (product == null)
                    throw new ArgumentException($"Данного товара-одежды не существует");
                product.Quantity -= quantity;
                await UpdateAsync(product);
                return product.Quantity;
            }
            catch (Exception e)
            {
                throw new Exception($"{e}");
            }
        }
        
        public async Task<long> IncreaseProductQuantity(long id, long quantity, Sizes size)
        {
            try
            {
                var product = await DbTable
                    .FirstOrDefaultAsync(x => x.Product.Equals(id) && x.Size.Equals(size));
                if (product == null)
                    throw new ArgumentException($"Данного товара-одежды не существует");
                product.Quantity += quantity;
                await UpdateAsync(product);
                return product.Quantity;
            }
            catch (Exception e)
            {
                throw new Exception($"{e}");
            }
        }
    }
}