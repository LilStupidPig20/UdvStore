using DataBaseStorage.DbModels;

namespace DataBaseStorage.ResponseModels
{
    public class GetOpenRequestsResponse
    {
        public Request Request { get; set; } 
        public string Fio { get; set; }
    }
}