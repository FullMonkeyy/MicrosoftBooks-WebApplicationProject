using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using Newtonsoft.Json;
using QuartaProvaPCTO.Entity;
using QuartaProvaPCTO.Models;
using System.Net;
using System.Text.Json.Nodes;

var builder = WebApplication.CreateBuilder(args);
LibraryContext context = new LibraryContext();
// Add services to the container.
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();


var app = builder.Build();
app.UseDefaultFiles();
app.UseStaticFiles();
// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();

///////////////////////////////   API   ///////////////////////////////////

//////GET//////
app.MapGet("/api/GetBook/{id}", async (int id) =>
{
    Book book = context.Books.Include(x => x.Genres).Include(x => x.Shelff).SingleOrDefault(x => x.Id == id);
    if (book == null)
    {
        return Results.NotFound($"No book with ID {id} was found.");
    }

    return Results.Ok(new BookModel(book, book.Shelff, book.Genres));
});
app.MapGet("/api/GetBookExactTitle/{title}", async (string title) =>
{
    Book book = context.Books.Include(x => x.Genres).Include(x => x.Shelff).FirstOrDefault(x => x.Title == title);
    if (book == null)
    {
        return Results.NotFound($"No book called {title} was found.");
    }

    return Results.Ok(new BookModel(book, book.Shelff, book.Genres));
});
app.MapGet("/api/GetBooksLittleTitle/{title}", async (string title) =>
{
    List<Book> bookss = context.Books.Include(x => x.Genres).Include(x => x.Shelff).Where(x => x.Title.StartsWith(title)).ToList();
    //.FirstOrDefault(x => x.Title.Contains(title))
    if (bookss == null)
    {
        return Results.NotFound($"No book called {title} was found.");
    }
    List<BookModel> bmlist = new List<BookModel>();
    BookModel bm;

    foreach (Book b in bookss)
    {

        bm = new BookModel(b, b.Shelff, b.Genres);
        bmlist.Add(bm);

    }
    return Results.Ok(bmlist);
});
app.MapGet("/api/GetBooksLittleGenre/{genre}", async (string genre) =>
{
    List<Book> bookss = context.Books.Include(x => x.Genres).Include(x => x.Shelff).ToList();
    bookss = bookss.FindAll(x => x.Genres.Exists(y => y.Name.StartsWith(genre)));
    //.FirstOrDefault(x => x.Title.Contains(title))
    if (bookss == null)
    {
        return Results.NotFound($"No book called {genre} was found.");
    }
    List<BookModel> bmlist = new List<BookModel>();
    BookModel bm;

    foreach (Book b in bookss)
    {

        bm = new BookModel(b, b.Shelff, b.Genres);
        bmlist.Add(bm);

    }
    return Results.Ok(bmlist);
});
app.MapGet("/api/GetBooksLittleShelf/{shelf}", async (string shelf) =>
{
    List<Book> bookss = context.Books.Include(x => x.Genres).Include(x => x.Shelff).ToList();
    bookss = bookss.FindAll(x => x.Shelff != null).FindAll(y => y.Shelff.Name.StartsWith(shelf));
    //.FirstOrDefault(x => x.Title.Contains(title))
    if (bookss == null)
    {
        return Results.NotFound($"No book called {shelf} was found.");
    }
    List<BookModel> bmlist = new List<BookModel>();
    BookModel bm;

    foreach (Book b in bookss)
    {

        bm = new BookModel(b, b.Shelff, b.Genres);
        bmlist.Add(bm);

    }
    return Results.Ok(bmlist);
});
app.MapGet("/api/GetBooksEXACTShelf/{shelf}", async (string shelf) =>
{
    List<Book> bookss = context.Books.Include(x => x.Genres).Include(x => x.Shelff).ToList();
    bookss = bookss.FindAll(x => x.Shelff != null).FindAll(y => y.Shelff.Name.Equals(shelf));

    //.FirstOrDefault(x => x.Title.Contains(title))
    if (bookss == null)
    {
        return Results.NotFound($"No book called {shelf} was found.");
    }
    List<BookModel> bmlist = new List<BookModel>();
    BookModel bm;

    foreach (Book b in bookss)
    {

        bm = new BookModel(b, b.Shelff, b.Genres);
        bmlist.Add(bm);

    }
    return Results.Ok(bmlist);
});
app.MapGet("/api/GetBooksEXACTGenre/{genre}", async (string genre) =>
{
    List<Book> bookss = context.Books.Include(x => x.Genres).Include(x => x.Shelff).ToList();
    bookss = bookss.FindAll(x => x.Genres != null).FindAll(y=> y.Genres.Exists(y=>y.Name.Equals(genre)));

    //.FirstOrDefault(x => x.Title.Contains(title))
    if (bookss == null)
    {
        return Results.NotFound($"No book called {genre} was found.");
    }
    List<BookModel> bmlist = new List<BookModel>();
    BookModel bm;

    foreach (Book b in bookss)
    {

        bm = new BookModel(b, b.Shelff, b.Genres);
        bmlist.Add(bm);

    }
    return Results.Ok(bmlist);
});
app.MapGet("/api/GetGenreName/{name}", async (string name) =>
{
    Genre genre = context.Genres.Include(x => x.Books).Include(x => x.Shelves).FirstOrDefault(x => x.Name == name);
    if (genre == null)
    {
        return Results.NotFound($"No book called {name} was found.");
    }

    List<int> bokid = new List<int>();
    genre.Books.ForEach(x => bokid.Add(x.Id));
    List<int> slfsid = new List<int>();
    genre.Shelves.ForEach(x => slfsid.Add(x.Id));

    return Results.Ok(new GenreModel(genre, bokid, slfsid));
});
app.MapGet("/api/Bookreturnmodel", async () =>
{
    List<string> gname = new List<string>();
    gname.Add("Horror");
    gname.Add("FaNTASY");


    string shelfname = "The big one";
    string author = "Davide";
    string story = "A story about vimpires";
    int npg = 355;

    return Results.Ok(new BookReturnModel("Libro bello", gname, shelfname, author, story, npg, null, null));
});
app.MapGet("/api/GenreModel", async () =>
{

    Genre gg = new Genre();
    string Name = "Comedy";
    string Description = "Descrizione di un genere divertente";
    List<string> shlefnames = new List<string>();
    List<string> booknames = new List<string>();
    shlefnames.Add("The Big One");
    shlefnames.Add("The Small One");
    booknames.Add("Harry Potter");
    booknames.Add("Libro Bello");
    return Results.Ok(new GenreReturnModel(Name, Description, booknames, shlefnames));
});
app.MapGet("/api/ShelfModel", async () =>
{

    Genre gg = new Genre();
    string Name = "The piccolina";
    List<string> Genresnames = new List<string>();
    List<string> booknames = new List<string>();
    Genresnames.Add("The Big One");
    Genresnames.Add("The Small One");
    booknames.Add("Harry Potter");
    booknames.Add("Libro Bello");
    return Results.Ok(new ShelfReturnModel(Name, booknames, Genresnames));
});
app.MapGet("/api/GetBooks", async () =>
{
    List<BookModel> bmlist = new List<BookModel>();
    BookModel bm;

    foreach (Book b in context.Books.Include(x => x.Genres).Include(y => y.Shelff))
    {

        bm = new BookModel(b, b.Shelff, b.Genres);
        bmlist.Add(bm);

    }
    return Results.Ok(bmlist);
});
app.MapGet("/api/GetShelves", async () =>
{
    List<ShelfModel> bmlist = new List<ShelfModel>();
    ShelfModel bm;

    foreach (Shelf b in context.Shelves.Include(x => x.Genres).Include(y => y.Books))
    {

        List<int> bokid = new List<int>();
        b.Books.ForEach(x => bokid.Add(x.Id));
        List<string> gnsid = new List<string>();
        b.Genres.ForEach(x => gnsid.Add(x.Name));

        bm = new ShelfModel(b, bokid, gnsid);
        bmlist.Add(bm);

    }
    return Results.Ok(bmlist);
});
app.MapGet("/api/GetShelvesExec/{esclusa}", async (string? esclusa) =>
{
    List<ShelfModel> bmlist = new List<ShelfModel>();
    ShelfModel bm;

    foreach (Shelf b in context.Shelves.Include(x => x.Genres).Include(y => y.Books))
    {

        if (b.Name != esclusa)
        {
            List<int> bokid = new List<int>();
            b.Books.ForEach(x => bokid.Add(x.Id));
            List<string> gnsid = new List<string>();
            b.Genres.ForEach(x => gnsid.Add(x.Name));

            bm = new ShelfModel(b, bokid, gnsid);
            bmlist.Add(bm);
        }
    }
    return Results.Ok(bmlist);
});
app.MapGet("/api/GetGenres", async () =>
{
    List<GenreModel> bmlist = new List<GenreModel>();
    GenreModel bm;

    foreach (Genre b in context.Genres.Include(x => x.Shelves).Include(y => y.Books))
    {

        List<int> bokid = new List<int>();
        b.Books.ForEach(x => bokid.Add(x.Id));
        List<int> slfsid = new List<int>();
        b.Shelves.ForEach(x => slfsid.Add(x.Id));

        bm = new GenreModel(b, bokid, slfsid);
        bmlist.Add(bm);

    }
    return Results.Ok(bmlist);
});

//////POST//////
app.MapPost("/api/PostBook", (JsonObject json) =>
{
    string jasonstring = json.ToString();

    BookReturnModel? book = JsonConvert.DeserializeObject<BookReturnModel>(jasonstring);
  
    if (book == null) return Results.UnprocessableEntity();
    List<string> tmp = new List<string>();

    //////////////////////////////////
    book = book as BookReturnModel;

    Book newbook = new Book();
    if (book.Shelfname != null)
    {
        newbook.Shelff = context.Shelves.FirstOrDefault(x => x.Name == book.Shelfname);
        if (newbook.Shelff == null)
        {

            return Results.UnprocessableEntity("The shelf named " + book.Shelfname + " doesn't exist");

        }

    }


    if (book.Genres != null)
    {


        newbook.Genres = new List<Genre>();

        foreach (string genname in book.Genres)
        {
            newbook.Genres.Add(context.Genres.FirstOrDefault(x => x.Name == genname));

            if (newbook.Genres[newbook.Genres.Count - 1] == null)
            {

                return Results.UnprocessableEntity("The genre named " + genname + " doesn't exist");
            }

        }
    }



    newbook.Title = book.Title.Trim();
    newbook.Author = book.Author;
    newbook.Story = book.Story;
    newbook.npages = book.Npages;
    newbook.PhotoName = book.ImagePath;
    newbook.ThirdId = book.ThirdId;
    context.Books.Add(newbook);

    context.SaveChanges();
    /////////////////////////////////////////
    return Results.Accepted("id libro:");

});
app.MapPost("/api/PostGenre", (JsonObject json) =>
{

    GenreReturnModel? genre = JsonConvert.DeserializeObject<GenreReturnModel>(json.ToString());
    if (genre == null) return Results.UnprocessableEntity();

    //////////////////////////////////
    genre = genre as GenreReturnModel;

    Genre newgenre = new Genre();
    newgenre.Name = genre.Name.Trim();
    newgenre.Description = genre.Description;
    if (genre.BookNames != null)
    {
        newgenre.Books = new List<Book>();

        foreach (string bookn in genre.BookNames)
        {

            Book adding = context.Books.FirstOrDefault(x => x.Title == bookn);
            if (adding == null) return Results.NotFound("No " + adding.Title + " was found");

        }
    }

    if (genre.ShelfNames != null)
    {
        newgenre.Shelves = new List<Shelf>();

        foreach (string shelfn in genre.ShelfNames)
        {
            Shelf adding = context.Shelves.FirstOrDefault(x => x.Name == shelfn);
            if (adding == null) return Results.NotFound("Shelf named " + adding.Name + " did not find");
            newgenre.Shelves.Add(adding);

        }
    }

    context.Genres.Add(newgenre);
    context.SaveChanges();
    /////////////////////////////////////////
    return Results.Accepted();

});
app.MapPost("/api/PostShelf", (JsonObject json) =>
{

    ShelfReturnModel? shelf = JsonConvert.DeserializeObject<ShelfReturnModel>(json.ToString());
    if (shelf == null) return Results.UnprocessableEntity();

    //////////////////////////////////
    shelf = shelf as ShelfReturnModel;

    Shelf newshelf = new Shelf();
    newshelf.Name = shelf.Name.Trim();

    if (shelf.BookNames != null)
    {
        newshelf.Books = new List<Book>();

        foreach (string bookn in shelf.BookNames)
        {

            Book adding = context.Books.FirstOrDefault(x => x.Title == bookn);

            if (adding == null) return Results.NotFound("No " + adding.Title + " was found");
            newshelf.Books.Add(adding);
        }
    }

    if (shelf.GenreNames != null)
    {
        newshelf.Genres = new List<Genre>();


        foreach (string genren in shelf.GenreNames)
        {

            Genre adding = context.Genres.FirstOrDefault(x => x.Name == genren);
            if (adding == null) return Results.NotFound("Genre named " + adding.Name + " did not find");
            newshelf.Genres.Add(adding);


        }
    }

    context.Shelves.Add(newshelf);
    context.SaveChanges();
    /////////////////////////////////////////
    return Results.Accepted();

});
app.MapPost("/api/PostImage/{thirdid}", async (HttpContext json, string thirdid) =>
{
    var formFile = json.Request.Form.Files.GetFile("image");

    if (formFile != null && formFile.Length > 0)
    {
        // Salva l'immagine su disco
        var uploadFolderPath = Path.Combine(Directory.GetCurrentDirectory(), "wwwroot", "CSS", "Covers");
        var fileName = thirdid; // Aggiungi thirdid al nome del file
        var imagePath = Path.Combine(uploadFolderPath, fileName);

        using (var fileStream = new FileStream(imagePath, FileMode.Create))
        {
            await formFile.CopyToAsync(fileStream);
        }

        // Restituisci una risposta di successo
        json.Response.StatusCode = (int)HttpStatusCode.Accepted;
        await json.Response.WriteAsync("Immagine caricata con successo.");
    }
    else
    {
        json.Response.StatusCode = (int)HttpStatusCode.BadRequest;
        await json.Response.WriteAsync("Nessuna immagine caricata.");
    }

});
//////REMOVE//////
app.MapDelete("/api/RemoveABook/{id}", async (int id) => {

    Book book = context.Books.Include(x => x.Genres).Include(x => x.Shelff).SingleOrDefault(x => x.Id == id);
    if (book == null) return Results.NotFound("Genre not found");
    else
    {
        foreach (Genre genre in book.Genres)
        {
            genre.Books.Remove(book);

        }

        book.Shelff = null;


        context.Books.Remove(book);
        string path = "wwwroot\\CSS\\Covers\\"+book.ThirdId;
        if(File.Exists(path))
        File.Delete(path);

        context.SaveChanges();
        return Results.NoContent();
    }


});
app.MapDelete("/api/RemoveAShelf/{name}", async (string name) => {

    Shelf shelf = context.Shelves.Include(x => x.Genres).Include(x => x.Books).SingleOrDefault(x => x.Name == name);
    if (shelf == null) return Results.NotFound("Genre not found");
    else
    {
        foreach (Genre genre in shelf.Genres)
        {
            genre.Shelves.Remove(shelf);

        }
        foreach (Book book in shelf.Books)
        {

            book.Shelff = null;
        }

        context.Shelves.Remove(shelf);
        await context.SaveChangesAsync();
        return Results.NoContent();
    }


});
app.MapDelete("/api/RemoveAGenre/{name}", async (string name) =>
{

    Genre genre = context.Genres.Include(x => x.Shelves).Include(x => x.Books).SingleOrDefault(x => x.Name == name);
    if (genre == null) return Results.NotFound("Genre not found");
    else
    {
        foreach (Shelf shelf in genre.Shelves)
        {
            shelf.Genres.Remove(genre);

        }
        foreach (Book book in genre.Books)
        {
            book.Genres.Remove(genre);

        }

        context.Genres.Remove(genre);
        await context.SaveChangesAsync();
        return Results.NoContent();
    }



});

/////PUT////////
app.MapPut("/api/SaveChanges", async () =>
{

    context.SaveChanges();

    return Results.Accepted("Conessione avvenuta");

});
app.MapPut("/api/ConnectBookAndGenre/{bookid}-{genrename}", async (int bookid, string genrename) =>
{

    Book book = await context.Books.Include(x => x.Genres).SingleOrDefaultAsync(x => x.Id == bookid);
    if (book == null) return Results.NotFound("Book not found");

    Genre genre = await context.Genres.FirstOrDefaultAsync(x => x.Name == genrename);
    if (genre == null) return Results.NotFound("Shelf not found");


    if (book.Genres.Exists(x => x.Name == genrename)) return Results.BadRequest("Book and Genre already connected");
    book.Genres.Add(genre);


    context.SaveChanges();

    return Results.Accepted("Conessione avvenuta");

});
app.MapPut("/api/ModifyBook/{bookid}/{Title}/{Author}/{Story}", async (int bookid, string Title, string Author, string Story) =>
{

    Book book = context.Books.SingleOrDefault(x => x.Id == bookid);
    if (book == null) return Results.NotFound("Book not found");

    book.Story = Story;
    book.Author = Author;
    book.Title = Title;

    context.SaveChanges();
    return Results.Accepted("Conessione avvenuta");

});
app.MapPut("/api/ConnectBookAndShelf/{bookid}-{shelfname}", async (int bookid, string shelfname) =>
{
    Book book = context.Books.Include(x => x.Shelff).FirstOrDefault(x => x.Id == bookid);
    if (book == null) return Results.NotFound("Book not found");

    Shelf shelf = context.Shelves.FirstOrDefault(x => x.Name == shelfname);
    if (shelf == null) return Results.NotFound("Shelf not found");

    book.Shelff = shelf;


    context.SaveChanges();

    return Results.Accepted("Conessione avvenuta");

});
app.MapPut("/api/ConnectGenreAndShelf/{genreid}-{shelfname}", async (int genreid, string shelfname) =>
{
    Genre genre = context.Genres.Include(x => x.Shelves).SingleOrDefault(x => x.Id == genreid);
    if (genre == null) return Results.NotFound("Book not found");

    Shelf shelf = context.Shelves.Include(x => x.Genres).SingleOrDefault(x => x.Name == shelfname);
    if (shelf == null) return Results.NotFound("Shelf not found");
    if (genre.Shelves.Exists(x => x.Id == shelf.Id)) return Results.BadRequest("Shelf and Genre already connected");
    genre.Shelves.Add(shelf);

    context.SaveChanges();

    return Results.Accepted("Conessione avvenuta");

});
app.MapPut("/api/DisconnectConnectBookAndGenre/{bookid}-{genrename}", async (int bookid, string genrename) =>
{

    Book book = await context.Books.Include(x => x.Genres).SingleOrDefaultAsync(x => x.Id == bookid);

    if (book == null) return Results.NotFound("Book not found");

    Genre genre = await context.Genres.FirstOrDefaultAsync(y => y.Name == genrename);
    if (genre == null) return Results.NotFound("Genre not found");


    if (!book.Genres.Exists(x => x.Id == genre.Id)) return Results.BadRequest("Book and Genre already disconnected");
    book.Genres.Remove(genre);


    context.SaveChanges();

    return Results.Accepted("Conessione avvenuta");

});
app.MapPut("/api/DisconnectBookAndShelf/{bookid}-{shelfname}", async (int bookid, string shelfname) =>
{
    Book book = await context.Books.FindAsync(bookid);
    if (book == null) return Results.NotFound("Book not found");

    Shelf shelf = context.Shelves.SingleOrDefault(x => x.Name == shelfname);
    if (shelf == null) return Results.NotFound("Shelf not found");

    if (book.Shelff != shelf) return Results.BadRequest("The shelf has been already disconected");

    book.Shelff = null;
    context.SaveChanges();

    return Results.Accepted("Disconessione avvenuta");

});
app.MapPut("/api/DisconnectGenreAndShelf/{genreid}-{shelfid}", async (int genreid, int shelfid) =>
{
    Genre genre = context.Genres.Include(x => x.Shelves).SingleOrDefault(x => x.Id == genreid);
    if (genre == null) return Results.NotFound("Book not found");

    Shelf shelf = context.Shelves.Include(x => x.Genres).SingleOrDefault(x => x.Id == shelfid);
    if (shelf == null) return Results.NotFound("Shelf not found");


    if (!genre.Shelves.Exists(x => x.Id == shelfid)) return Results.BadRequest("Shelf and Genre are already disconnected");
    genre.Shelves.Remove(shelf);


    context.SaveChanges();

    return Results.Accepted("Disconessione avvenuta");

});

///////////////////////////////   API   ///////////////////////////////////
app.Run();

