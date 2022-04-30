using DataBaseStorage.DbModels;

namespace DataBaseStorage.ResponseModels
{
    public class GetAllRequestsCoinsResponse
    {
        public EmployeeRequest EmployeeRequest { get; set; } 
        public string Fio { get; set; }
    }
}