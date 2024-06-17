using Newtonsoft.Json;
using QuartaProvaPCTO.Entity;

namespace QuartaProvaPCTO.Models
{
    public class BookReturnModel
    {
        [JsonProperty("title")]
        public string Title { get; set; }

        [JsonProperty("genres")]
        public List<string> Genres { get; set; }

        [JsonProperty("shelfName")]
        public string Shelfname { get; set; }

        [JsonProperty("author")]
        public string Author { get; set; }

        [JsonProperty("story")]
        public string Story { get; set; }

        [JsonProperty("numPages")]
        public int Npages { get; set; }

        [JsonProperty("ImagePath")]
        public string ImagePath { get; set; }

        [JsonProperty("ThirdId")]
        public string ThirdId { get; set; }
      
        public BookReturnModel(string t, List<string> gn, string? s, string aut, string sto, int pgs, string img, string td)
        {

            Title = t;
            Genres = gn;
            Shelfname = s;
            Author = aut;
            Story = sto;
            Npages = pgs;
            ImagePath = img;
            ThirdId = td;
        }
    }
}
