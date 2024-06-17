namespace QuartaProvaPCTO.Models
{
    public class ShelfReturnModel
    {
        public string Name { get; set; }
        public List<string>? BookNames { get; set; }
        public List<string>? GenreNames { get; set; }

        public ShelfReturnModel(string n, List<string>? bks, List<string>? gns)
        {

            Name = n;
            BookNames = bks;
            GenreNames = gns;

        }
    }
}
