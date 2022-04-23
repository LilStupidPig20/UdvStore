using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace DataBaseStorage.DbModels
{
    [Table("employees")]
    public class Employee : IDbModel
    {
        [Key] 
        [Column("id")] 
        public long Id { get; set; }
        
        [Column("fio")] 
        public string Fio { get; set; }
        
        [Column("position")] 
        public string Position { get; set; }
        
        [Column("login")] 
        public string Login { get; set; }
        
        [Column("password")] 
        public string Password { get; set; }
    }
}