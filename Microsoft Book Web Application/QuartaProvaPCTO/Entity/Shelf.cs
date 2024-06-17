namespace QuartaProvaPCTO.Entity
{
    public class Shelf
    {

        public int Id { get; set; }
        public List<Book>? Books { get; set; }
        public List<Genre>? Genres { get; set; }
        public string Name { get; set; }
    }
}
