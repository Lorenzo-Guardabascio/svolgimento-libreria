// URL dell'API
const apiUrl = "https://striveschool-api.herokuapp.com/books"; // URL dell'API

// Quando la pagina è caricata, chiama fetchLibri()
window.onload = () => {
    fetchLibri(); // Chiama fetchLibri per ottenere i libri dall'API
}

// Funzione per fare il fetch dei libri dall'API
const fetchLibri = () => {
    // Fetch dell'API
    fetch(apiUrl)
        .then((response) => response.json()) // Trasforma la risposta in JSON
        .then((books) => {
            // Selettore del contenitore dei libri
            let container = document.querySelector(".album .container .row");
            // Aggiorna l'HTML con i libri mappati
            container.innerHTML = 
                books
                    .map((book) => { // Mappa i libri
                        return `
                        <div class='col col-3'>
                        <div class="card mb-4 shadow-sm" id='book_${book.asin}'>
                        <img src='${book.img}' />
                        <div class="card-body">
                        <p class='font-weight-bold text-truncate book-title'> ${book.title} </p>
                        <div class="d-flex flex-column justify-content-between align-items-center" >
                        <button class='btn btn-primary' onclick="addToCart('${book.title}','${book.price}')">
                         EUR ${book.price} </button>
                         <button class='btn btn-secondary' onclick='hideMe(this)'> Hide </button>
                        <a href="./detail.html?id=${book.asin}" class='btn btn-secondary'> Book </a>
                        </div>
                        </div>
                        </div>
                        </div>`;
                    })
                    .join(''); // Unisce tutti i libri in una stringa
        });
}

/**
 * Aggiunge un libro al carrello.
 *
 */
const addToCart = (title,price) => {
    // Selettore del contenitore del carrello
    let cartContainer = document.querySelector(".container .row.cart");
    // Elemento del libro da aggiungere al carrello
    let book = document.createElement('div');
    book.className = 'col col-3'; // Assegna classe al libro
    // Crea e aggiungi il card del libro
    let card = document.createElement('div');
    card.className = 'card mb-4 shadow-sm';
    book.appendChild(card);
    // Crea e aggiungi il titolo del libro
    let titleElement = document.createElement('span');
    titleElement.innerHTML = `${title} <b>${price}</b>`;
    card.appendChild(titleElement);
    // Crea e aggiungi il pulsante per rimuovere il libro
    let removeButton = document.createElement('button');
    removeButton.className = 'btn btn-danger';
    removeButton.innerHTML = 'Remove';
    removeButton.addEventListener('click', removeBook);
    card.appendChild(removeButton);
    // Aggiungi il libro al contenitore del carrello
    cartContainer.appendChild(book);
}

/**
 * Funzione per rimuovere un libro dal carrello, quando si fa click sul pulsante 'Remove'.
 */
function removeBook(event) {
    // Rimuovi l'elemento genitore del pulsante cliccato
    event.target.closest('.col').remove(); // .closest('.col') trova l'elemento genitore che ha la classe 'col'
}

/**
 * Funzione per nascondere l'elemento padre di `this`
 */
function hideMe(element) {
    // Trovi l'elemento che contiene l'elemento `this`
    let box = element.closest('.col'); // .closest('.col') trova l'elemento genitore che ha la classe 'col'
    // Imposta lo stile di visualizzazione a 'none' per nascondere l'elemento
    box.style.display = "none"; // .style.display = "none" nasconde l'elemento
}

