using DataBaseStorage.Enums;

namespace UdvStore.RequestModels
{
    public class CreateOrderRequest
    {
        public long Id { get; set; }
        public long Count { get; set; }
        public Sizes Size { get; set; }
    }
}