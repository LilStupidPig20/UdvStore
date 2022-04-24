using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace DataBaseStorage.DbModels
{
    [Table("admins")]
    public class Admin : IDbModel
    {
        [Key] 
        [Column("id")] 
        public long Id { get; set; }

        [Column("login")] 
        public string Login { get; set; }
        
        [Column("password")] 
        public string Password { get; set; }
        
        [Column("name")] 
        public string Name { get; set; }
    }
}