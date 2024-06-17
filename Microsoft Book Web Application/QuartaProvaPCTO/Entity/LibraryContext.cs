using Microsoft.EntityFrameworkCore;

namespace QuartaProvaPCTO.Entity
{
    public class LibraryContext:DbContext
    {

        public DbSet<Book> Books { get; set; }
        public DbSet<Shelf> Shelves { get; set; }
        public DbSet<Genre> Genres { get; set; }

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            optionsBuilder.UseSqlServer(@"Server=(localdb)\MSSQLLocalDB;Database=QuartaProva;Trusted_Connection=True;");
        }


    }
}
