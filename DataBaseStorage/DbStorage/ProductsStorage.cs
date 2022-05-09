using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using DataBaseStorage.ConfigurationDb;
using DataBaseStorage.Context;
using DataBaseStorage.DbModels;
using DataBaseStorage.ResponseModels;
using DataBaseStorage.StoragesInterfaces;
using Microsoft.EntityFrameworkCore;

namespace DataBaseStorage.DbStorage
{
    public class ProductsStorage : BaseStorage<Product>, IProductsActions
    {
        public ProductsStorage(DBConfig dbConfig) : base(dbConfig)
        {
        }

        public async Task<List<ProductResponse>> GetProductsWithoutDescription()
        {
            try
            {
                return await DbTable.Select(x => new ProductResponse
                    {
                        Id = x.Id,
                        Name = x.Name,
                        Price = x.Price,
                        CurrentQuantity = x.CurrentQuantity,
                        Image = x.Image
                    }).ToListAsync();
            }
            catch (Exception e)
            {
                throw new Exception("Невозможно получить список товаров");
            }
        }
    }
}