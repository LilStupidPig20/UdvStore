using DataBaseStorage.DbModels;

namespace DataBaseStorage.ResponseModels
{
    public class GetFullClosedRequestResponse
    {
        public ClosedEmployeesRequest closedEmployeeRequest { get; set; }
        public string Fio { get; set; }
    }
}