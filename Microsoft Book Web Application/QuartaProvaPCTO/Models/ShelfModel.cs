using QuartaProvaPCTO.Entity;

namespace QuartaProvaPCTO.Models
{
    public class ShelfModel
    {

        public int Id { get; set; }
        public string Name { get; set; }
        public List<int>? Bookids { get; set; }
        public List<string>? Genresids { get; set; }

        public ShelfModel(Shelf s, List<int> bks, List<string> gns)
        {

            Id = s.Id;
            Name = s.Name;
            if (bks != null)
            {
                Bookids = new List<int>();
                Bookids = bks;
            }
            if (gns != null)
            {
                Genresids = new List<string>();
                Genresids = gns;
            }



        }
    }
}
