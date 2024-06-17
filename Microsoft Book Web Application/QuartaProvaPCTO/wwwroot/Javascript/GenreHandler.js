function GetGenres() {

    
    document.getElementById("indietro").addEventListener("click", function () {
        window.location.href = 'NewBook.html';

    });
    document.getElementById("vaivanti").addEventListener("click", function () {
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
    fetch('api/GetGenres')
        .then(response => response.json())
        .then(data => AddGenres(data))
      

}
var allacepted = false;
var aceptedgenreslist = localStorage.getItem("shelfgenrees");
if (aceptedgenreslist!= "niente") {
    aceptedgenreslist = JSON.parse(aceptedgenreslist);
    GetGenres();
}
else {

    allacepted = true;
    GetGenres();

}

function AddGenres(genres) {

    var presente=true

    for (let i = 0; i < genres.length; i++) {

        presente = false;

        for (let j = 0; j < aceptedgenreslist.length; j++) {

            if (genres[i].name == aceptedgenreslist[j] && !allacepted) {
                presente = true;
            }
            else if (allacepted) {
                presente = true;
            }

        }
        if (presente)
            AddGenre(genres[i]);
    }
   
    setInterval(UpdateShelfState, 2)

    if (allacepted) {

        shelfadd = document.createElement("div");
        shelfadd.setAttribute("class", "add");
        shelfadd.addEventListener("click", function () {

            window.location.href = 'NewGenre.html';

        })
        shelfadd.innerHTML += "<img class='shelfimg' src='./CSS/Assets/PLUSS.png'></img><br>";

        document.getElementById("Genres").appendChild(shelfadd);
    }
}
var generi=[];
function AddGenre(genre) {

    divo = document.getElementById("Genres");

    genrediv = document.createElement("div");
    genrediv.setAttribute("class", "shelf")

    genrediv.id = genre.name;
    var GENRE = new Genre(genre.name, null, null, null);
    GENRE.name = genrediv.id;
    generi.push(GENRE);
    divo.appendChild(genrediv);

    scaffale = document.getElementById(genre.name);
    scaffale.innerHTML += "<img class='shelfimg' src='./CSS/Assets/Star.png'></img><br>";
    scaffale.innerHTML += "<div class='innershelftext'>" + genre.name + "</div>";
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
            document.getElementById(generi[i].name).style.backgroundColor = "rgba(128, 128, 128, 0.2)";
            document.getElementById(generi[i].name).style.backdropFilter = "blur(3px)";
   



        }
        else {
            document.getElementById(generi[i].name).style.backgroundColor = "rgba(255, 128, 255, 0.2)";
    
        }
            

    }
    

}
var clickedshelf;