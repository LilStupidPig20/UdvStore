using BusinessLayer.StorageActions;

namespace BusinessLayer.Services
{
    public class OrderService
    {
        private readonly IStorageActions storage;
        
        public OrderService(IStorageActions storage)
        {
            this.storage = storage;
        }
    }
}