
function getBooks() {

    var bookid = localStorage.getItem("BookVisited");

    fetch('api/GetBook/' + bookid)
        .then(response => response.json())
        .then(data => AddBook(data))
        .catch(error => console.error("Unable get the shelves mannaggia"))

}
function getShelves(esclusa) {

    fetch('api/GetShelvesExec/'+esclusa )
        .then(response => response.json())
        .then(data => AddShelfOption(data))
        .catch(error => console.error("Unable get the shelves mannaggia"))

}
function getGenre() {
fetch('/api/GetGenres')
    .then(response => {
        if (!response.ok) {
            throw new Error('Errore nella richiesta API');
        }
        return response.json();
    })
    .then(data => {
        // Qui puoi gestire i dati ricevuti dalla tua API
        AddGenre(data);
        console.log(data);
    })
    .catch(error => {
        // Gestione degli errori
        console.error('Si è verificato un errore:', error);
    });
 }
function DisplayPossibileGneres() {
    getGenre()


}
var nuovigeneri = [];
function AddGenre(genres) {

    var possiblegenre = document.getElementById("popop");
    possiblegenre.innerHTML = "";
    var generee;

    for (let i = 0; i < genres.length; i++) {
        if (!generilista.some(obj => obj.name === genres[i].name)) {
            generee = document.createElement("div");
            generee.innerHTML += genres[i].name;
            generee.id = genres[i].name;
            var GENRE = new Genre(genres[i].name, null, null, null);
            nuovigeneri.push(GENRE);

            generee.setAttribute("class", "generiopzionali");
            generee.addEventListener("click", function () {

                var nome = this.id;

                for (let j = 0; j < nuovigeneri.length; j++) {

                    if (nuovigeneri[j].name == nome) {

                        if (nuovigeneri[j].selected) {
                            nuovigeneri[j].selected = false;
                     
                        }
                        else {

                            nuovigeneri[j].selected = true;
                           
                        }

                    }

                }

            })
            possiblegenre.appendChild(generee);
        }

    }


}
var generilista = [];
var book;
var fuorilibreria = false;
function AddBook(b) {

    if (b.shelf== null) {
        shelf = "Fuori dalla libreria"
        fuorilibreria = true;
    }
    else {
        shelf = b.shelf.name;
    }


    book = new Book(b.title, b.genres, shelf, b.author, b.story, b.npages, null, b.thirdId);
    UpdateBookDisplayed();
    document.getElementById("bookimage").src = "./CSS/Covers/" + book.ThirdId;
    
  
}
function AddShelfOption(shelves) {
    var shelf = document.getElementById("Shelf")
    
    for (let i = 0; i < shelves.length; i++) {

        shelf.innerHTML += "<option>" + shelves[i].name + "</option>";

    }
    if (!fuorilibreria)
    shelf.innerHTML += "<option>Preso dalla libreria</option>";
}
function UpdateBookDisplayed() {

    document.getElementById("TitleBook").value = book.title;
    document.getElementById("Author").value = book.author;
    document.getElementById("Story").value = book.story;
    document.getElementById("subimage").innerHTML = book.title;
    var shelf = document.getElementById("Shelf")
    shelf.innerHTML += "<option>" + book.shelfName + "</option>";
    getShelves(book.shelfName);

    var generi = document.getElementById("Genres");
    var divo;
    generi.innerHTML = "";

    for (var i = 0; i < book.genres.length; i++) {
        var GENRE = new Genre(book.genres[i].name, null, null, null);
        generilista.push(GENRE);

        divo = document.createElement("div");
        divo.innerHTML = book.genres[i].name;
        divo.setAttribute("class", "genre")
        divo.id = book.genres[i].name;

        //Appendo il popup

        var popo = document.createElement("div");
        popo.innerHTML = "Elimina";
        popo.style.display = "none";
        popo.setAttribute("class", "popoelimina");
        popo.id = divo.id + "_elimina";
        popo.addEventListener("click", function () {

            var nome = this.id.replace("_elimina", "");

            for (let j = 0; j < generilista.length; j++) {

                if (generilista[j].name == nome) {

                    if (generilista[j].selected) {
                        generilista[j].selected = false;
                        this.innerHTML = "Elimina";
                    }
                    else {

                        generilista[j].selected = true;
                        this.innerHTML = "Annulla";
                    }

                }

            }

        });
        divo.addEventListener("mouseover", function () {

            document.getElementById(this.id + "_elimina").style.display = "block";

        })
        divo.addEventListener("mouseout", function () {

            document.getElementById(this.id + "_elimina").style.display = "none";

        })
        divo.appendChild(popo);
        generi.appendChild(divo);

    }
    divo = document.createElement("div");
    divo.id = "AddGenre";
    divo.setAttribute("class", "genre");
    divo.innerHTML +="<img id='AddGenreImage'   src='./CSS/Assets/PLUSS.png'>"
    generi.appendChild(divo);


    divo = document.createElement("div");
    divo.id = "popop";
    generi.appendChild(divo);


  //generi.innerHTML += "<div class='genre' id='AddGenre'><img id='AddGenreImage' src='./CSS/Assets/PLUSS.png'></div><div id='popop'></div>";
    document.getElementById("AddGenre").addEventListener("click", function () {
        if (firstshow) {
            DisplayPossibileGneres();
            firstshow = false;
            showedgeners = true;
        }
        
    });
}
getBooks();
//ChangeParameter("Author", "Cazzo negro");
var firstshow = true;
var showedgeners = false;

 async function ChangeBook(title,author,story) {

    const options = {
        method: 'PUT', // Metodo della richiesta
        headers: {
            'Content-Type': 'application/json' // Tipo di contenuto del corpo della richiesta (JSON)
        }
    };


    var bookid = localStorage.getItem("BookVisited");
    var url = 'api/ModifyBook/' + bookid + "/" + title+"/"+author+"/"+story;

     await fetch(url, options)
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

function SaveChages() {
    SaveChagesFetch();
   

}

 function SaveChagesFetch() {

    const options = {
        method: 'PUT', // Metodo della richiesta
        headers: {
            'Content-Type': 'application/json' // Tipo di contenuto del corpo della richiesta (JSON)
        }
    };


    
    var url = 'api/SaveChanges';

    fetch(url, options)
        .then(response => {
            if (!response.ok) {
                throw new Error('Errore nella richiesta PUT');
            }
            return response.json(); // Estrai il corpo della risposta come JSON
        })
        .then(data => {
            console.log('Risposta ricevuta:', data);
           
            // Fai qualcosa con i dati ricevuti, se necessario
        })
        .catch(error => {
            console.error('Si è verificato un errore:', error);
        });



}
 async function AddingGenresAtTheBook() {

    for (let i = 0; i < nuovigeneri.length; i++) {

        if (nuovigeneri[i].selected) {
            await ChangeGenre(nuovigeneri[i].name);
            console.log(nuovigeneri[i].name + " Aggiunto");
        }
    

     }

     console.log("Tutti i generi sono stati aggiunti");

}

document.getElementById("Salva").addEventListener("click", async function () {

    var title = document.getElementById("TitleBook").value;
    var Author = document.getElementById("Author").value;
    var Story = document.getElementById("Story").value;

    await ChangeBook(title, Author, Story);
    await AddingGenresAtTheBook();
    for (let i = 0; i < generilista.length; i++) {

        if (generilista[i].selected)
           await EliminaGenere(generilista[i].name)

    }
    ChangeShelfControl();
    document.getElementById("popupcambiamenti").style.display = "block";
   
    
})

async function EliminaGenere(genere) {

    var dascollegare = genere;
    const options = {
        method: 'PUT', // Metodo della richiesta
        headers: {
            'Content-Type': 'application/json' // Tipo di contenuto del corpo della richiesta (JSON)
        }
    };


    var bookid = localStorage.getItem("BookVisited");
    var url = 'api/DisconnectConnectBookAndGenre/' + bookid + "-" + dascollegare;

    await fetch(url, options)
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
 function ChangeShelfControl() {

    var shelf = document.getElementById("Shelf").value;

    if (shelf == "Preso dalla libreria") {

        DisconnectShelf()

    }
    else {

        ChangeShelf();
    }

}
function DisconnectShelf() {

   
    const options = {
        method: 'PUT', // Metodo della richiesta
        headers: {
            'Content-Type': 'application/json' // Tipo di contenuto del corpo della richiesta (JSON)
        }
    };

    var dascollegare = book.shelfName;
    var bookid = localStorage.getItem("BookVisited");

    var url = 'api/DisconnectBookAndShelf/' + bookid + "-" + dascollegare;

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
function ChangeShelf() {

    const options = {
        method: 'PUT', // Metodo della richiesta
        headers: {
            'Content-Type': 'application/json' // Tipo di contenuto del corpo della richiesta (JSON)
        }
    };

    var daconnettere = document.getElementById("Shelf").value;
    var bookid = localStorage.getItem("BookVisited");

    var url = 'api/ConnectBookAndShelf/' + bookid + "-" + daconnettere;

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
async function ChangeGenre(genrename) {

    const options = {
        method: 'PUT', // Metodo della richiesta
        headers: {
            'Content-Type': 'application/json' // Tipo di contenuto del corpo della richiesta (JSON)
        }
    };

    var daconnettere = genrename;
    var bookid = localStorage.getItem("BookVisited");

    var url = 'api/ConnectBookAndGenre/' + bookid + "-" + daconnettere;

    await fetch(url, options)
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
function UpdateShelfState() {

    nceked = generilista.length;

    for (let i = 0; i < generilista.length; i++) {



        if (generilista[i].selected == false) {
            document.getElementById(generilista[i].name).style.backgroundColor = "#6B3529";


        }
        else {
            document.getElementById(generilista[i].name).style.backgroundColor = "red";

        }


    }


}
setInterval(UpdateShelfState, 2)
function UpdateNewGenreState() {

    nceked = nuovigeneri.length;

    for (let i = 0; i < nceked; i++) {



        if (nuovigeneri[i].selected == false) {
            document.getElementById(nuovigeneri[i].name).style.backgroundColor = "lightblue";


        }
        else {
            document.getElementById(nuovigeneri[i].name).style.backgroundColor = "red";

        }


    }


}
setInterval(UpdateNewGenreState, 2)