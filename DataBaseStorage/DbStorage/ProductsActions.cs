using System;
using System.Collections.Generic;
using System.Linq;
using DataBaseStorage.Context;
using DataBaseStorage.DbModels;
using DataBaseStorage.ResponseModels;
using DataBaseStorage.StoragesInterfaces;
using Microsoft.EntityFrameworkCore;

namespace DataBaseStorage.DbStorage
{
    public class ProductsActions : BaseActions<Product>, IProductsActions
    {
        public ProductsActions(IDbContextFactory<PostgresContext> context) : base(context)
        {
        }

        public List<ProductResponse> GetProductsWithoutDescription()
        {
            using var context = DbContextFactory.CreateDbContext();
            try
            {
                return context.Products.Select(x => new ProductResponse
                    {
                        Id = x.Id,
                        Name = x.Name,
                        Price = x.Price,
                        CurrentQuantity = x.CurrentQuantity,
                        Image = x.Image
                    }).ToList();
            }
            catch (Exception e)
            {
                throw new Exception("Невозможно получить список товаров");
            }
        }
    }
}