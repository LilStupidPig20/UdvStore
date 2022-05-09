using DataBaseStorage.DbModels;

namespace DataBaseStorage.ResponseModels
{
    public class GetOpenRequestsResponse
    {
        public OpenEmployeesRequest Request { get; set; } 
        public string Fio { get; set; }
    }
}