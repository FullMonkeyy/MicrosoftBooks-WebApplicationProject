namespace QuartaProvaPCTO.Models
{
    public class GenreReturnModel
    {


        public string Name { get; set; }
        public string Description { get; set; }
        public List<string>? BookNames { get; set; }
        public List<string>? ShelfNames { get; set; }

        public GenreReturnModel(string n, string d, List<string>? bns, List<string>? gns)
        {


            Name = n;
            Description = d;
            BookNames = bns;
            ShelfNames = gns;

        }
    }
}
