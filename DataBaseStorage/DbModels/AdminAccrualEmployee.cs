using System.ComponentModel.DataAnnotations.Schema;

namespace DataBaseStorage.DbModels
{
    [Table("adminsAccrualEmployees")]
    public class AdminAccrualEmployee : IDbModel
    {
        [Column("id")]
        public long Id { get; set; }
        
        [Column("adminAccrual")]
        public long AdminAccrual { get; set; }
        
        [Column("employee")]
        public long Employee { get; set; }
    }
}