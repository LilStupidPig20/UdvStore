using System.Collections.Generic;
using DataBaseStorage.ResponseModels;

namespace DataBaseStorage.StoragesInterfaces
{
    public interface IProductsActions
    {
        public List<ProductResponse> GetProductsWithoutDescription();
    }
}