using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using NpgsqlTypes;

namespace UdvStore.DbModels
{
    [Table("employees")]
    public class Employee
    {
        [Key]
        [Column("id")]
        public int Id { get; set; }
        [Column("fio")]
        public string Fio { get; set; }
        [Column("position")]
        public string Position { get; set; }
    }
}