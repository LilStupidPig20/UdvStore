using System;

namespace DataBaseStorage.ResponseModels
{
    public class GetClosedRequestsResponse
    {
        public long Id { get; set; }
        public string Fio { get; set; }
        public DateTime TimeSend { get; set; }
    }
}