GetShelves();
function getBooks() {

    var bookid = localStorage.getItem("BookVisited");

    fetch('api/GetBook/' + bookid)
        .then(response => response.json())
        .then(data => AddBook(data))
        .catch(error => console.error("Unable get the shelves mannaggia"))

}
var book;
function AddBook(b) {

    if (b.shelf == null) {
        shelf = "Fuori dalla libreria"
        fuorilibreria = true;
    }
    else {
        shelf = b.shelf.name;
    }


    book = new Book(b.title, b.genres, shelf, b.author, b.story, b.npages, null, b.thirdId);

    document.getElementById("bookimage").src = "./CSS/Covers/" + book.ThirdId;
    
    UpdateBookDisplayed();
}
function UpdateBookDisplayed() {


    document.getElementById("Author").innerHTML+= book.author;
    document.getElementById("Story").innerHTML += book.story;
    document.getElementById("maintitle").innerHTML += book.title;
   
    
}
function GetShelves() {


    fetch('api/GetGenres')
        .then(response => response.json())
        .then(data => AddShelves(data))
        .catch(error => console.error("Unable get the shelves mannaggia"))

}
function AddShelf(shelf) {

    divo = document.getElementById("Shelves");

    shelfdiv = document.createElement("div");
    shelfdiv.setAttribute("class", "shelf")
     
    shelfdiv.id = shelf.name;
    divo.appendChild(shelfdiv);

    scaffale = document.getElementById(shelf.name);
   
    scaffale.innerHTML += "<div class='innershelftext'>" + shelf.name + "</div><div class='Books'   id='ShelfID" + shelfdiv.id + "'></div>";

    var bottone = document.createElement("div");
    bottone.id = "Bottone_" + shelf.name;
    bottone.innerHTML += "Elimina";
    bottone.setAttribute("class", "EliminaShelf");
    bottone.addEventListener("click", function () {
        ineliminazione = this.id.split("_")[1];

        document.getElementById("popupelimina").style.display = "block";
      

    });
    scaffale.appendChild(bottone);

    scaffale.addEventListener('click', function () {
        // Incremento del valore della variabile
        clickedshelf = this.id;

        // Aggiornamento di qualche valore per mostrare la modifica (esempio)
        console.log("Valore della variabile modificato:", clickedshelf);
    });
    
    //getBooks(shelfdiv.id);
    
}
async function AddShelves(shelf) {

    const shelves = shelf;


    for (let i = 0; i < shelves.length; i++) {

        AddShelf(shelves[i]);
        await getBooksEXACTShelf(shelves[i].name)
    }

    
    shelfadd = document.createElement("div");
    shelfadd.setAttribute("class", "add");

    shelfadd.innerHTML += "<img class='shelfimg' src='./CSS/Assets/PLUSS.png'><br>";
    shelfadd.addEventListener("click", function () {

        window.location.href = 'NewGenre.html';

    })
    document.getElementById("Shelves").appendChild(shelfadd);
}


document.getElementById("cancella").addEventListener("click", function () {

    removeAShelf(ineliminazione);
    document.getElementById("popupelimina").style.display = "none";
    setTimeout(UpdatePag,500)

});

function UpdatePag() {


    document.getElementById("Shelves").innerHTML = "";
    GetShelves()

}

document.getElementById("annulla").addEventListener("click", function () {

    document.getElementById("popupelimina").style.display = "none";

});
function GetBooks(shlefname) {

    aspetta = true;

    url = 'api/GetBooksLittleShelf/' + shlefname;

    fetch(url)
        .then(response => response.json())
        .then(data => AddBooksAtShelf(data,shelfname))
        .catch(error => console.error("Unable get the shelves mannaggia"))

}
function AddBooksAtShelf(books, shelfname) {

    aspetta = false;

    if (books != null) {

        books.title = "sdidiubiwbfjwdeif";

    }

}
var response
var booksCC
var listalibri = [];
async function getBooksEXACTShelf(shelf) {
    try {
         response = await fetch(`/api/GetBooksEXACTGenre/${shelf}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        else {

            booksCC = await response.json();

            var booookss = document.getElementById("ShelfID" + shelf);

            for (var i = 0; i < booksCC.length; i++) {
                listalibri.push(new Book(booksCC[i].title, booksCC[i].genres, booksCC.shelfname, booksCC[i].author, booksCC[i].story, booksCC[i].npages, null, booksCC[i].thirdId));
                var boook = document.createElement("div");
                boook.id = "Book"+booksCC[i].title;
                boook.innerHTML += booksCC[i].title;
                boook.innerHTML += "<img class='bookimage' src='./CSS/Covers/" + booksCC[i].thirdId+"'>";
                boook.setAttribute("class", "BOOK");
                boook.addEventListener("click", function () {

                    OpenBookView(this.id);

                });
                booookss.appendChild(boook);
                

            }


        }

       
        // Use the books data here
    } catch (error) {
        console.error('Error:', error);
    }
    return "figo";
}
function OpenBookView(id) {
    var bookdisplayed;
    for (let i = 0; i < listalibri.length; i++) {

        if (id == "Book" +listalibri[i].title) {

            filldisplay(listalibri[i]);
            document.getElementById("Shelves").style.filter = "brightness(50%)";
            document.body.style.overflow = "hidden";

        }


    }

}
function filldisplay(book) {


    document.getElementById("bookview").style.display = "block";
    document.getElementById("booktitle").innerHTML = book.title;
    document.getElementById("bookimage").src = "./CSS/Covers/"+book.ThirdId;
    document.getElementById("bookstory").innerHTML = "Story: "+book.story;

}
var ineliminazione;
//removeAShelf("Terzo Scaffale");
async function removeAShelf(name) {
    try {
        const response = await fetch("api/RemoveAGenre/"+name, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
            },
        });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        return response.status;
    } catch (error) {
        console.error('Error:', error);
    }
}