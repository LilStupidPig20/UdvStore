using System.Collections.Generic;
using System.Threading.Tasks;
using DataBaseStorage.ResponseModels;

namespace DataBaseStorage.StoragesInterfaces
{
    public interface IProductsActions
    {
        public Task<List<ProductResponse>> GetProductsWithoutDescription();
    }
}