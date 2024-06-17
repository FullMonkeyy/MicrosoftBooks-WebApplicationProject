class Book {
    constructor(title, genres, shelfName, author, story, numPages, ImagePath, ThirdId) {
        this.title = title;
        this.genres = genres;
        this.shelfName = shelfName;
        this.author = author;
        this.story = story;
        this.numPages = numPages;
        this.ImagePath = ImagePath;
        this.ThirdId = ThirdId;
    }
}

class Genre {
    constructor(name, description, bookNames, shelfNames) {
        this.name = name;
        this.description = description;
        this.bookNames = bookNames;
        this.shelfNames = shelfNames;
        this.selected = false
    }
}
class Shelf {


    constructor(name,bookNames, genreNames) {
        this.name = name;
        this.bookNames = bookNames;
        this.genreNames = genreNames;
       
    }
}
class DisplayedBook{

    constructor(title, genres, shelfName, author, story, numPages) {
        this.title = title;
        this.genres = genres;
        this.shelfName = shelfName;
        this.author = author;
        this.story = story;
        this.numPages = numPages;
      
    }

}