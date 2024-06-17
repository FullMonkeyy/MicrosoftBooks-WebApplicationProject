namespace QuartaProvaPCTO.Entity
{
    public class Book
    {
        public int Id { get; set; }
        public string Title { get; set; }
        public string Author { get; set; }
        public string Story { get; set; }
        public int npages { get; set; }
        public List<Genre>? Genres { get; set; }
        public Shelf? Shelff { get; set; }
        public string? PhotoName { get; set; }
        public string? ThirdId { get; set; }
    }
}
