




getBooks();
var BOOKS = [];
function getBooks() {

    fetch('api/GetBooks')
        .then(response => response.json())
        .then(data => AddBooks(data))
        .catch(error => console.error("Unable get the shelves mannaggia"))

}
document.getElementById("presiinprestito").addEventListener('input', function () {
    getBooks();
})
function AddBooks(book) {

    const books = book;
    document.getElementById("result").innerHTML = "";
    var withoutshelf = document.getElementById("presiinprestito").checked;
    for (let i = 0; i < books.length; i++) {
        var shelf;

        
     
        if (books[i].shelf == null) {
            shelf = "Fuori dalla libreria"

        }
        else {
            shelf = books[i].shelf.name;
        }

        if (withoutshelf) {

            if (books[i].shelf == null) {

                AddBook(books[i]);
                BOOKS.push(new Book(books[i].title, books[i].genres, shelf, books[i].author, books[i].story, books[i].npages, null, books[i].thirdId));
            }

        }
        else {
            AddBook(books[i]);
            BOOKS.push(new Book(books[i].title, books[i].genres, shelf, books[i].author, books[i].story, books[i].npages, null, books[i].thirdId));
        }
    }

    ///////ADD BOOK
    divo = document.getElementById("result");
    var descriptionbook = document.createElement("div");
    var addingbook = document.createElement("div");
    descriptionbook.setAttribute("class", "previewdescription");
    addingbook.id = "addingbook";
    addingbook.innerHTML += "<img id='addbookimage' src='./CSS/Assets/AddingBook.png'>";
    descriptionbook.style.display = "none";
    descriptionbook.id = "AddingBookDescription";
    addingbook.addEventListener("click", function () {

        window.location.href = 'NewBook.html';

    });
    addingbook.addEventListener("mouseover", function () {

        document.getElementById("AddingBookDescription").style.display = "block";

    });
    addingbook.addEventListener("mouseleave", function () {

        document.getElementById("AddingBookDescription").style.display = "none";
    });
    descriptionbook.innerHTML = "Aggiungi un nuovo libro";
    addingbook.appendChild(descriptionbook);
    divo.appendChild(addingbook);

    ///////VIEW SHELVES
    var addinggenre = document.createElement("div");
    addinggenre.id = "addinggenre";
    addinggenre.innerHTML += "<img id='addgenreimage' src='./CSS/Assets/addshelf.png'>";
    var descriptiongenre = document.createElement("div");
    descriptiongenre.setAttribute("class", "previewdescription");
    descriptiongenre.id = "ViewGenreDescription";
    descriptiongenre.style.display = "none";
    addinggenre.addEventListener("click", function () {

        window.location.href = 'Shelves.html';

    });
    addinggenre.addEventListener("mouseover", function () {

        document.getElementById("ViewGenreDescription").style.display = "block";

    });
    addinggenre.addEventListener("mouseleave", function () {

        document.getElementById("ViewGenreDescription").style.display = "none";
    });
    divo.appendChild(addinggenre);
    descriptiongenre.innerHTML = "Visualizzazione divisa per scaffali";
    addinggenre.appendChild(descriptiongenre);


    var addinggenres = document.createElement("div");
    addinggenres.id = "addgenressreal";
    var description = document.createElement("div");
    description.id = "ViewDescription";
    description.setAttribute("class", "previewdescription");
    description.style.display = "none";
   
    addinggenres.innerHTML += "<img id='addgenretrueimage' src='./CSS/Assets/Star.png'>";
    addinggenres.addEventListener("click", function () {

        window.location.href = 'Genres.html';

    });
    addinggenres.addEventListener("mouseover", function () {

        document.getElementById("ViewDescription").style.display = "block";

    });
    addinggenres.addEventListener("mouseleave", function () {

        document.getElementById("ViewDescription").style.display = "none";
    });
    divo.appendChild(addinggenres);
    description.innerHTML = "Visualizzazione divisa per generi";
    addinggenres.appendChild(description);
}
function OpenBookView(id) {
    var bookdisplayed;
    for (let i = 0; i < BOOKS.length; i++) {

        if (id == BOOKS[i].title) {

            filldisplay(BOOKS[i]);
            document.getElementById("result").style.filter = "brightness(50%)";
            document.body.style.overflow = "hidden";
        }


    }

}
function filldisplay(book) {


    document.getElementById("bookview").style.display = "block";
    document.getElementById("booktitle").innerHTML = book.title;
    document.getElementById("bookimage").src = "./CSS/Covers/" + book.ThirdId;
    document.getElementById("bookstory").innerHTML = "Story: " + book.story;

}
function AddBook(book) {

    var shelf;
    if (book.shelf == null) {
        shelf = "Preso in prestito"

    }
    else {
        shelf = book.shelf.name;
    }



    divo = document.getElementById("result");
  
    bookdiv = document.createElement("div");
    contdiv = document.createElement("div");
    
    bookdiv.addEventListener("click", function () {
       
        OpenBookView(this.dataset.ID);
       

    })
    contdiv.addEventListener("mouseover", function () {

       
        document.getElementById("image" + book.id).style.display = "block";
        document.getElementById("bookviewerrr" + book.id).style.display = "block";
     
         

    })
    contdiv.addEventListener("mouseleave", function () {


        document.getElementById("image" + book.id).style.display = "none";

        document.getElementById("bookviewerrr" + book.id).style.display = "none";

    })
    divo.appendChild(contdiv);
    contdiv.setAttribute("class", "totalbookcont")
    bookdiv.setAttribute("class", "bookcont")
    bookdiv.id = "book" + book.id;
    bookdiv.innerHTML += "<div class='titlebook'>" + book.title + "</div><br>";
    bookdiv.innerHTML += "<div class='Author'>" + book.author + "</div><br>";
    bookdiv.innerHTML +="<label class='genres'>Generi:</label>";
    bookdiv.innerHTML += "<div id=" + " genrebook" + book.id + " class='genress' > </div >";
    //if (book.shelf!=null)
      //  bookdiv.innerHTML += "<div class='shelf'>Scaffale:" + book.shelf.name + "</div><br>";
    //else
      //  bookdiv.innerHTML += "<div class='shelf'>Scaffale: Nessuno</div><br>";
    
    bookdiv.innerHTML += "<div class='shelfff''>" + shelf + "</div>";
    contdiv.appendChild(bookdiv);
    contdiv.innerHTML += "<img class='bookcover' src='./CSS/Covers/" + book.thirdId + "'><img class='points' style='display:none; transition:display 0.5s;' id='image" + book.id +"' src='./CSS/Assets/3points.png'>";
    contdiv.innerHTML += "<div class='blurrone' style='transition:transform 0.5s;transform:scaleY(0)' id='blurr" + book.id +"'></div>";
    contdiv.innerHTML += "<img class='viewviewbook' style='display:none; ' id='bookviewerrr" + book.id +"' transition:display 0.5s;'  src='./CSS/Assets/OpenBook.png'>";

   for (var i = 0; i < book.genres.length; i++) {

        var genredivo = document.createElement("div");
        genredivo.setAttribute("class", book.genres[i].name+" genre");
       genredivo.innerHTML = book.genres[i].name;
       var description = document.createElement("div");
       description.setAttribute("class", "genredecriptionbook");
       description.style.display = "none";
       description.id = "genredescription" + book.title + genredivo.className;
       genredivo.addEventListener("mouseover", function () {

           document.getElementById("genredescription" + book.title + this.className).style.display = "block";

       })
       genredivo.addEventListener("mouseleave", function () {

           document.getElementById("genredescription" + book.title + this.className).style.display = "none";

       })

       description.innerHTML = book.genres[i].description;
       document.body.appendChild(description);



       document.getElementById("genrebook" + book.id).appendChild(genredivo);

    }
   
    

    document.getElementById("image" + book.id).addEventListener("click", function (){

        document.getElementById("blurr" + book.id).style.transform = "scaleY(1)";

    })
    document.getElementById("bookviewerrr" + book.id).dataset.ID = book.title;
    document.getElementById("bookviewerrr" + book.id).addEventListener("click", function () {

        OpenBookView(this.dataset.ID);

    })

    var modificatore = document.getElementById("blurr" + book.id);
    var cancella = document.createElement("div");
    cancella.setAttribute("class", "annulla");
    cancella.innerHTML = "Annulla";
    cancella.addEventListener("click", function () {

        document.getElementById("blurr" + book.id).style.transform = "scaleY(0)";

    })
    var modifica = document.createElement("div");
    modifica.setAttribute("class", "modifica");
    modifica.innerHTML = "Modifica";
    modifica.addEventListener("click", function () {

        window.location.href = 'BookViewer.html';
        localStorage.setItem("BookVisited", book.id);

    })
    var elimina = document.createElement("div");
    elimina.setAttribute("class", "elimina");
    elimina.innerHTML = "Elimina";
    elimina.addEventListener("click", function () {

        Elimina(book.id);

    })
    modificatore.appendChild(modifica);
    modificatore.appendChild(elimina);
    modificatore.appendChild(cancella);
  
}


function SearchingBook(little) {
    var url;
    switch (document.getElementById("selectionsearch").value){

        case "Titolo":
            url = 'api/GetBooksLittleTitle/' + little;
            break;
        case "Genere":
            url = "api/GetBooksLittleGenre/" + little;
            break;
        case "Scaffale":
            url = "api/GetBooksLittleShelf/"+little;
            break;


    }



    fetch(url)
        .then(response => response.json())
        .then(data => AddBooks(data))
        .catch(error => console.error("Unable get the shelves mannaggia"))

}
//ResetChanges();
function ResetChanges() {

    
    const options = {
        method: 'PUT', // Metodo della richiesta
        headers: {
            'Content-Type': 'application/json' // Tipo di contenuto del corpo della richiesta (JSON)
        }
    };

    var url = "api/DenyUnsavedChanges" ;

    fetch(url, options)
        .then(response => {
            if (!response.ok) {
                throw new Error('Errore nella richiesta PUT');
            }
            return response.json(); // Estrai il corpo della risposta come JSON
        })
        .then(data => {
            console.log('Risposta ricevuta:', data);
            ChangeParameter("Title", document.getElementById("TitleBook").value);
            // Fai qualcosa con i dati ricevuti, se necessario
        })
        .catch(error => {
            console.error('Si è verificato un errore:', error);
        });


}
document.getElementById("searchbar").addEventListener('input', function () {
    if (this.value != "" && this.value != null) {
        SearchingBook(this.value);
    }
    else
        getBooks();
})
function Elimina(id) {

    var bookid = id;
    const options = {
        method: 'DELETE' // Metodo della richiesta
    };
    const url = "/api/RemoveABook/"+bookid;
    // Effettua la richiesta utilizzando fetch()
    fetch(url, options)
        .then(response => {
            if (!response.ok) {
                throw new Error('Errore nella richiesta DELETE');
            }
            console.log('Libro rimosso con successo.');
            // Puoi gestire la risposta qui se necessario
        })
        .catch(error => {
            console.error('Si è verificato un errore:', error);
        });

    setTimeout(location.reload(), 1000);
}





//window.location.href = 'BookViewer.html';
//localStorage.setItem("BookVisited", book.id);
