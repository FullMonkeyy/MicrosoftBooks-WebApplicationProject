function GetGenres() {


    document.getElementById("altrolibro").addEventListener("click", function () {
        window.history.back();

    });
    document.getElementById("indietro").addEventListener("click", function () {
        window.history.back();

    });
   /* document.getElementById("vaivanti").addEventListener("click", function () {
        if (nceked > 0) {
            var selectedgeneress = [];

            for (let i = 0; i < generi.length; i++) {

                if (generi[i].selected) {

                    selectedgeneress.push(generi[i].name);

                }


            }



            var listastringa = JSON.stringify(selectedgeneress)

            localStorage.setItem("genres", listastringa);

            window.location.href = 'AddingBook.html';

        }

    });
    */
    fetch('api/GetGenres')
        .then(response => response.json())
        .then(data => AddGenres(data))


}
function AddGenres(genres) {

    const shelves = genres;


    for (let i = 0; i < shelves.length; i++) {


        AddGenre(shelves[i]);

    }


    setInterval(UpdateShelfState, 2)
    shelfadd = document.createElement("div");
    shelfadd.setAttribute("class", "add");
    shelfadd.id = "adding";
    shelfadd.innerHTML += "<img class='shelfimg' src='./CSS/Assets/PLUSS.png'></img><br>";
    shelfadd.addEventListener("click", function () {

        window.location.href = 'NewGenre.html';

    })

    document.getElementById("genreselection").appendChild(shelfadd);
    
}


var generi = [];
function AddGenre(genre) {

    divo = document.getElementById("genreselection");

    genrediv = document.createElement("span");
    genrediv.setAttribute("class", "genre")

    genrediv.id = genre.name;
    var GENRE = new Genre(genre.name, null, null, null);
    GENRE.name = genrediv.id;
    generi.push(GENRE);
    genrediv.innerHTML = genre.name;

    divo.appendChild(genrediv);
    scaffale = document.getElementById(genre.name);
    //scaffale.innerHTML += "<img class='shelfimg' src='./CSS/Assets/Star.png'></img><br>";

    scaffale.addEventListener('click', function () {
        // Incremento del valore della variabile
        for (let i = 0; i < generi.length; i++) {

            if (generi[i].name == this.id) {

                if (generi[i].selected == false)
                    generi[i].selected = true;
                else
                    generi[i].selected = false;
            }

        }

        // Aggiornamento di qualche valore per mostrare la modifica (esempio)
        console.log("Valore della variabile modificato:", clickedshelf);
    });

}
var nceked = 0;

function UpdateShelfState() {

    nceked = generi.length;

    for (let i = 0; i < generi.length; i++) {



        if (generi[i].selected == false) {
            document.getElementById(generi[i].name).style.backgroundColor = "#6B3529";


        }
        else {
            document.getElementById(generi[i].name).style.backgroundColor = "red";

        }


    }


}
function storeshelf() {

    var pattern1 = /^([A-Z]|[a-z]|\d| ){1,}$/;
    var text = document.getElementById("shelfname").value;
    if (!pattern1.test(text)) {

        document.getElementById("shelfname").style.border = "red solid 2px";

    }
    else {

        var selectedgeneress = [];
        for (let i = 0; i < generi.length; i++) {

            if (generi[i].selected) {

                selectedgeneress.push(generi[i].name);

            }


        }
        var shelf = new Shelf(text, null, selectedgeneress);
        AddShelf(shelf)
    }

}
function AddShelf(shelf) {

    url = "api/PostShelf";

    fetch(url, {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(shelf)
    })
        .then(response => {
            if (response.ok) {
                // La richiesta è andata a buon fine (status code 2xx)
                console.log("La richiesta POST è andata a buon fine.");
                document.getElementById("popup").style.display = "block";
            } else {
                // La richiesta ha avuto problemi (status code diverso da 2xx)
                console.error("Si è verificato un problema durante la richiesta POST.");
            }
        })
        .catch(error => {
            // Si è verificato un errore durante l'invio della richiesta
            console.error("Si è verificato un errore durante l'invio della richiesta POST:", error);
        });

}
