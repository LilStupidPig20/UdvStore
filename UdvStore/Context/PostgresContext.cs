using Microsoft.EntityFrameworkCore;
using UdvStore.DbModels;

namespace UdvStore.Context
{
    public partial class PostgresContext : DbContext
    {
        public virtual DbSet<Employee> Employees { get; set; }
        
        public PostgresContext()
        {
        }
 
        public PostgresContext(DbContextOptions<PostgresContext> options)
            : base(options)
        {
        }
        
        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            if (!optionsBuilder.IsConfigured)
            {
                optionsBuilder.UseNpgsql("Host=localhost;Port=5432;Database=udvStoreDb;Username=postgres;Password=art123em");
            }
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            OnModelCreatingPartial(modelBuilder);
        }
 
        partial void OnModelCreatingPartial(ModelBuilder modelBuilder);
    }
}