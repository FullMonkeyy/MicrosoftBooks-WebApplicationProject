
document.getElementById("altrolibro").addEventListener("click", function () {
    window.history.back();


});
document.getElementById("indietro").addEventListener("click", function () {
    window.history.back();
});
function storegenre() {

    var name = document.getElementById("genrename").value;
    var description = document.getElementById("description").value;
  
    var pattern1 = /^([A-Z]|[a-z]|\d| ){1,}$/;

    if (!pattern1.test(name) && !pattern1.test(description)) {

        document.getElementById("genrename").style.border = "red solid 2px";
        document.getElementById("description").style.border = "red solid 2px";
    }
    else {

        var genere = new Genre(name, description, null, null);
        AddShelf(genere)
    }

}
function AddShelf(genere) {

    url = "api/PostGenre";

    fetch(url, {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(genere)
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