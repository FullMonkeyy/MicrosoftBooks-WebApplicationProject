using QuartaProvaPCTO.Entity;
using System.Net;

namespace QuartaProvaPCTO.Models
{
    public class GenreModel
    {

        public int? Id { get; set; }
        public string? Name { get; set; }
        public string? Description { get; set; }
        public List<int>? Bookids { get; set; }
        public List<int>? Shelvesids { get; set; }

        public GenreModel(Genre gg, List<int> bks, List<int> slfs)
        {

            Id = gg.Id;
            Name = gg.Name;
            Description = gg.Description;
            if (bks != null)
            {
                Bookids = new List<int>();
                Bookids = bks;
            }
            if (slfs != null)
            {
                Shelvesids = new List<int>();
                Shelvesids = slfs;
            }

        }


    }
}
