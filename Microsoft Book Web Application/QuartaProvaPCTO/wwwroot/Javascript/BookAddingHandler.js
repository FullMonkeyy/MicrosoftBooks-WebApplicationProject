
function SalvaLibro(){
    
    var intpag = document.getElementById("pagine").value;

    var pattern = /^[0-9]{1,}$/gm
    if (!pattern.test(intpag)) {

        alert("Numero di pagine non corretto");

    }
    else {
        var pattern1 = /^([A-Z]|[a-z]|[0-9]| |'){1,}$/gm
        var pattern2 = /^([A-Z]|[a-z]|[0-9]| |'){1,}$/gm
        if (!pattern1.test(document.getElementById("Titolo").value) || !pattern2.test(document.getElementById("Autore").value)) {
            alert("Titolo o autore non valido");
        }
        else {
            SendImage();
        }

    }

}

function KeyGenerator() {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let result = '';
    for (let i = 0; i < 18; i++) {
        const randomIndex = Math.floor(Math.random() * characters.length);
        result += characters.charAt(randomIndex);
    }
    return result;
}




function SendImage() {
    var genres = localStorage.getItem("genres");
    genres = JSON.parse(genres);
    var shelf = localStorage.getItem("shelf");
    var Author = document.getElementById("Autore").value;
    var Title = document.getElementById("Titolo").value;
    var Story = document.getElementById("Trama").value;
    var intpag = document.getElementById("pagine").value;
    var fileInput = document.getElementById('bookimage');
    var file = fileInput.files[0];
    var ThirdId = KeyGenerator();

    if (file) {
        var formData = new FormData();
        formData.append('image', file);
        var fileName = file.name;
        var fileExtension = fileName.split('.').pop()
        ThirdId = ThirdId + "." + fileExtension
        var libro = new Book(Title, genres, shelf, Author, Story, intpag, file.name, ThirdId);
       
        AddBook(libro)

        fetch('/api/PostImage/'+ThirdId, {
            method: 'POST',
            body: formData
        })
            .then(response => {
                if (response.ok) {
                    console.log('Immagine caricata con successo.');
                } else {
                    console.error('Si è verificato un errore durante il caricamento dell\'immagine.');
                }
            })
            .catch(error => {
                console.error('Si è verificato un errore durante il caricamento dell\'immagine:', error);
            });
    } else {
        console.error('Nessun file selezionato.');
    }

}
function AddBook(book) {

    url = "api/PostBook";

    fetch(url, {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(book)
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
function UnAltroLibro() {

    window.location.href = 'NewBook.html';

}
function Libreria() {

    window.location.href = 'Library.html';

}
function Indietro() {

    window.location.href = 'Genre.html';

}
document.getElementById("vaiallalibreria").addEventListener("click", Libreria);
document.getElementById("altrolibro").addEventListener("click", UnAltroLibro);