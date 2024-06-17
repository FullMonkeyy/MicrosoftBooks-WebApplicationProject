
localStorage.setItem("shelfgenrees", "nulllll");
function AddNewBook() {
  window.location.href = 'NewBook.html';
    //getItems();

    
}
var shelvesgeneri = []
var generishelf = [];



//ciaooooooooooo
function getItems(){

    document.getElementById("indietro").addEventListener("click", function () {
         window.history.back();

    });
    document.getElementById("vaivanti").addEventListener("click", function () {
        if (clickedshelf != null) {

            localStorage.setItem("shelf", clickedshelf + "");


            ///////////GESTIONE GENERI DELLA SHELF
          
            var listadeigeneridellashelf=null;
            for (var i = 0; i < shelvesgeneri.length; i++) {

                if (shelvesgeneri[i].name == clickedshelf) {

                    listadeigeneridellashelf = shelvesgeneri[i].genreNames;

                }

            }
            shelvesgeneri//<----- variabile dove sono salvate le shelf

            if (listadeigeneridellashelf.length>0) {
                var listadeigeneridellashelf = JSON.stringify(listadeigeneridellashelf)
                localStorage.setItem("shelfgenrees", listadeigeneridellashelf);
            }
            else {
                localStorage.setItem("shelfgenrees", "niente");
            }

            window.location.href = 'Genre.html';

        }

    });
    fetch('api/GetShelves')
  .then(response=>response.json())
        .then(data => AddShelves(data))
      .catch(error=>console.error("Unable get the shelves mannaggia"))

}




function AddShelves(shelf){

    const shelves=shelf;


    for(let i=0; i<shelves.length;i++){

      AddShelf(shelves[i]);

    }


    shelfadd = document.createElement("div");
    shelfadd.setAttribute("class", "add");
   
    shelfadd.innerHTML += "<img class='shelfimg' src='./CSS/Assets/PLUSS.png'></img><br>";
    shelfadd.addEventListener("click", function () {

        window.location.href = 'AddShelf.html';

    })
    document.getElementById("shelves").appendChild(shelfadd);
}
function AddShelf(shelf) {

    divo = document.getElementById("shelves");

    shelfdiv = document.createElement("div");
    shelfdiv.setAttribute("class", "shelf")

    shelfdiv.id = shelf.name;
    divo.appendChild(shelfdiv);

    scaffale = document.getElementById(shelf.name);
    scaffale.innerHTML += "<img class='shelfimg' src='./CSS/Assets/6519743.png'></img><br>";
    scaffale.innerHTML += "<div class='innershelftext'>" + shelf.name + "</div>";
    scaffale.addEventListener("mouseover", function () {
        
        document.getElementById("generi_" + this.id).style.display = "block";

    });
    scaffale.addEventListener("mouseleave", function () {

        document.getElementById("generi_" + this.id).style.display = "none";

    });
    var shelfpop = document.createElement("div");
    shelfpop.setAttribute("class", "genrecontainer");
    shelfpop.id = "generi_" + scaffale.id;
    shelfpop.style.display = "none";
    
    generishelf = [];
    for (let i = 0; i < shelf.genresids.length; i++) {

        var paragraf = document.createElement("p");
        paragraf.setAttribute("class", "genre");
        paragraf.innerHTML = shelf.genresids[i];
        generishelf.push(shelf.genresids[i]);
        shelfpop.appendChild(paragraf);

    }
    if (shelf.genresids.length == 0) {

        var paragraf = document.createElement("p");
        paragraf.setAttribute("class", "genre");
        paragraf.innerHTML = "Tutti i generi";
        
        shelfpop.appendChild(paragraf);

    }

    var shelfff = new Shelf(shelf.name, null, generishelf)
    shelvesgeneri.push(shelfff)

    scaffale.appendChild(shelfpop);

    scaffale.addEventListener('click', function () {
        // Incremento del valore della variabile
        clickedshelf = this.id;

        var genericontenitorenomi;

        
        

        // Aggiornamento di qualche valore per mostrare la modifica (esempio)
        console.log("Valore della variabile modificato:", clickedshelf);
    }); 

}







setInterval(UpdateShelfState,2)
function UpdateShelfState() {

    var shelves = document.getElementsByClassName("shelf");
    for (let i = 0; i < shelves.length; i++) {

        shelves[i].style.backgroundColor = "rgba(128, 128, 128, 0.5)";
        shelves[i].style.backdropFilter = "blur(3px)";
       


    }
    if (clickedshelf != null) {

        document.getElementById(clickedshelf).style.backgroundColor = "rgba(255, 255, 0, 0.5)";

    }

}
var clickedshelf;






function GetGenres() {


    document.getElementById("indietro").addEventListener("click", function () {
        window.location.href = 'index.html';

    });
    document.getElementById("vaivanti").addEventListener("click", function () {
        if (clickedshelf != null) {

            localStorage.setItem("shelf", clickedshelf + "");
            window.location.href = 'Genre.html';

        }
        

    });
    fetch('api/GetGenres')
        .then(response => response.json())
        .then(data => AddShelves(data))
        .catch(error => console.error("Unable get the shelves mannaggia"))

}
