// Recupera i parametri passati nell'URL e li salva in un oggetto
const parametri = new URLSearchParams(location.search); // new URLSearchParams converte la stringa nell'oggetto
const id = parametri.get('id'); // parametri.get('id') recupera il valore dell'elemento 'id'

// Costruisce l'URL completo per la richiesta API
const url = "https://striveschool-api.herokuapp.com/books/"+ id ; 

// Questo script viene eseguito quando la pagina è caricata
window.onload = () => {
    // Effettua una richiesta GET all'API
    fetch(url) // fetch(url) effettua la richiesta GET all'API
    .then((raw) => raw.json()) // .then((raw) => raw.json()) trasforma la risposta in JSON
    .then((libro) => { // .then((libro) => { gestisce la risposta API
        // Selettore del contenitore dei libri
        let contenitore = document.querySelector(".album .container .row")
        // Aggiorna l'HTML con i dettagli del libro
        contenitore.innerHTML =` 
            <!-- Selettore del contenitore dei libri -->
            <div class='col col-3'> 
                <!-- Selettore del card del libro -->
                <div class="card mb-4 shadow-sm" id='book_${libro.asin}'>
                    <!-- Immagine del libro -->
                    <img src='${libro.img}' />
                    <!-- Contenitore del corpo del libro -->
                    <div class="card-body">
                        <!-- Titolo del libro -->
                        <p class='font-weight-bold text-truncate book-title'> ${libro.title} </p>
                        <!-- Bottone per aggiungere al carrello -->
                        <div class="d-flex flex-column justify-content-between align-items-center" >
                            <button class='btn btn-primary' onclick="addToCart('${libro.title}','${libro.price}')"> 
                                <!-- Pulsante per aggiungere al carrello -->
                                EUR ${libro.price} </button>
                            <!-- Pulsante per nascondere il libro -->
                            <button class='btn btn-secondary' onclick=''> Nascondi </button>
                            <!-- Pulsante per accedere alla pagina dettagli del libro -->
                            <a href="./detail.html?id=${libro.asin}" class='btn btn-secondary'> Libro </a>
                        </div>
                        <!-- Pulsante per visualizzare i dettagli del libro -->
                        <a class='btn btn-warning w-100'> Dettagli </a>
                    </div>
                </div> 
            </div>`
    }) 
} 
