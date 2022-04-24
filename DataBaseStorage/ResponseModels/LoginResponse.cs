namespace DataBaseStorage.ResponseModels
{
    public class LoginResponse
    {
        public long UserId { get; set; }
        public string Token { get; set; }
        public string Login { get; set; }
        public string Fio { get; set; }
        public string Position { get; set; }
        public bool IsAdmin { get; set; }
    }
}