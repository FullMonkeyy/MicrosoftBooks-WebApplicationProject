using QuartaProvaPCTO.Entity;

namespace QuartaProvaPCTO.Models
{
    public class BookModel
    {
        public int Id { get; set; }
        public string Title { get; set; }
        public string Author { get; set; }
        public string Story { get; set; }
        public int npages { get; set; }
        public string ImagePath { get; set; }
        public ShelfModel shelf { get; set; }
        public List<GenreModel> genres { get; set; }
        public string? ThirdId { get; set; }

        public BookModel(Book converting, Shelf s, List<Genre> g)
        {

            Id = converting.Id;
            Title = converting.Title;
            Author = converting.Author;
            Story = converting.Story;
            npages = converting.npages;
            ImagePath = converting.PhotoName;
            ThirdId = converting.ThirdId;
            if (s != null)
                shelf = new ShelfModel(s, null, null);
            genres = new List<GenreModel>();
            foreach (Genre gg in g)
            {
                genres.Add(new GenreModel(gg, null, null));
            }


        }
    }
}
