let searchInput = document.getElementById('search-input');
let voiceSearch = document.querySelector('.mic-search-icon-container');
let micIcon = document.querySelector('.mic-icon');

// var userInput = "";

searchInput.addEventListener('input', () => {
    // userInput = searchInput.value;
    fetch(`https://www.omdbapi.com/?s=${searchInput.value}&apikey=72b8c020`)
    .then(response => response.json())
    .then(function(data) {
        console.log(data);
    renderMovies(data.Search)
    })
    .catch(error => console.log(error));
});


// navbar controller

const home = document.getElementById('home');
const search = document.getElementById('search');
const watchlist = document.getElementById('watchlist');
const favourite = document.getElementById('favourite');
const contactUs = document.getElementById('contact-us');

home.addEventListener('click', () => {
    home.classList.add('active');
    search.classList.remove('active');
    watchlist.classList.remove('active');
    favourite.classList.remove('active');
    contactUs.classList.remove('active');
});

search.addEventListener('click', () => {
    search.classList.add('active');
    home.classList.remove('active');
    watchlist.classList.remove('active');
    favourite.classList.remove('active');
    contactUs.classList.remove('active');
});

watchlist.addEventListener('click', () => {
    watchlist.classList.add('active');
    home.classList.remove('active');
    search.classList.remove('active');
    favourite.classList.remove('active');
    contactUs.classList.remove('active');
});

favourite.addEventListener('click', () => {
    favourite.classList.add('active');
    home.classList.remove('active');
    search.classList.remove('active');
    watchlist.classList.remove('active');
    contactUs.classList.remove('active');
});

contactUs.addEventListener('click', () => {
    contactUs.classList.add('active');
    home.classList.remove('active');
    search.classList.remove('active');
    watchlist.classList.remove('active');
    favourite.classList.remove('active');
});


// voice search

voiceSearch.addEventListener('click', () => {
    voiceSearch.classList.toggle('active');

    if (voiceSearch.classList.contains('active')) {
        let recognition  = new webkitSpeechRecognition();
        recognition .lang = 'en-Gb';
        recognition .continuous = true;
        recognition .interimResults = true;
        recognition .maxAlternatives = 1;

        recognition .onresult = function (event) {
            let result = event.results[event.resultIndex];
            if (result.isFinal) {
                console.log(result[0].transcript);
                searchInput.value = result[0].transcript;
            }
        }
        recognition .start();
    } else if (!voiceSearch.classList.contains('active')){
        recognition .stop();
    }
});

// movies card

function renderMovies(movies) {
    const moviesCardContainer = document.querySelector('.movies-card-container');
    moviesCardContainer.innerHTML = '';
    // movies.forEach(movie => {
    for (let i = 0; i < movies.length; i++) {
    const element = document.createElement('div');
    element.classList.add('movie-card');
    element.innerHTML = `
    <div class="card">
        <div class="product-image-container">
            <img class="product-image" src="${movies[i].Poster}"></img>
        </div>
        <div class="product-details">
        <div class="product-title">${movies[i].Title} <span>${movies[i].Year}</div>
        </div>
        <div class="like-container">
            <img class="like-image" src="      https://cdn-icons-png.flaticon.com/512/10037/10037207.png  "></img>
        </div>
        <div class="add-to-watchlist-button-container">
            <img class="add-to-watchlist-image" src="      https://cdn-icons-png.flaticon.com/512/2704/2704855.png  "></img>
        </div>
        <div class="add-to-watchlist-button">Add to Watchlist</div>
    </div>
</div>
    `;
    moviesCardContainer.appendChild(element);
    }
}