const searchInput = document.getElementById('search-input');
const voiceSearch = document.querySelector('.mic-search-icon-container');
const micIcon = document.querySelector('.mic-icon');

const searchbarContainer = document.querySelector('.searchbar-container');
const moviesCardContainer = document.querySelector('.movies-card-container');
const searchSlogon = document.querySelector('.search-slogon');

const homeContainer = document.querySelector('.home-container');
const searchBody = document.querySelector('.search-body');

const apiUrl = "https://www.omdbapi.com/?s="
const apiKey = "&apikey=72b8c020"

async function fetchMovies() {
    const response = await fetch(apiUrl + `${searchInput.value.trim()}` + apiKey);
    const data = await response.json();
    if (data.Response == "False") {
        moviesCardContainer.innerHTML = `
        <div class="no-movie-found">
            <img src="https://cdn-icons-png.flaticon.com/512/7465/7465691.png"></img>
        </div>
        `;
    } else {
        renderMovies(data.Search);
    }
}

function userInput() {
    searchInput.addEventListener('input', () => {
        if (searchInput.value == "") {
            moviesCardContainer.style.display = "none";
        } else {
            searchbarContainer.style.marginTop = "0px";
            searchSlogon.style.display = "none";
            searchbarContainer.style.marginBottom = "0px";
            moviesCardContainer.style.display = "flex";
            
        }
        fetchMovies();
        // fetch(apiUrl + `${searchInput.value}` + apiKey)
        // .then(response => response.json())
        // .then(function(data) {
        //     if (data.Response == "False") {
        //         moviesCardContainer.innerHTML = `
        //         <div class="no-movie-found">
        //             <img src="https://cdn-icons-png.flaticon.com/512/7465/7465691.png"></img>
        //         </div>
        //         `;
        //     } else {
        //         renderMovies(data.Search);
        //     }
        // })
        // .catch(error => console.log(error));
    });
}

userInput();


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
    homeContainer.classList.add('active');
    searchBody.classList.remove('active');
});

search.addEventListener('click', () => {
    search.classList.add('active');
    home.classList.remove('active');
    watchlist.classList.remove('active');
    favourite.classList.remove('active');
    contactUs.classList.remove('active');
    searchBody.classList.add('active');
    homeContainer.classList.remove('active');
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
    } else if (!voiceSearch.classList.contains('active')) {
        recognition .stop();
    }
});


// home page

const homeSearchButton = document.querySelector('.home-search-button');

homeSearchButton.addEventListener('click', () => {
    search.classList.add('active');
    home.classList.remove('active');
    watchlist.classList.remove('active');
    favourite.classList.remove('active');
    contactUs.classList.remove('active');
    searchBody.classList.add('active');
    homeContainer.classList.remove('active');
});

// movies card

function renderMovies(movies) {
    const moviesCardContainer = document.querySelector('.movies-card-container');
    moviesCardContainer.innerHTML = '';
    for (let i = 0; i < movies.length; i++) {
        fetch(`https://www.omdbapi.com/?i=${movies[i].imdbID}&apikey=72b8c020`)
        .then(response => response.json())
        .then(function(data) {

            // movie poster
            if (data.Poster == "N/A") {
                data.Poster = "https://static.displate.com/857x1200/displate/2022-04-15/7422bfe15b3ea7b5933dffd896e9c7f9_46003a1b7353dc7b5a02949bd074432a.jpg";
            } else {
                data.Poster = data.Poster;
            }
            
            // adding movie card
            const element = document.createElement('div');
            element.classList.add('movie-card');
            element.innerHTML = `
            <div class="card">
                <div class="movie-image-container">
                    <img class="movie-image" src="${data.Poster}"></img>
                </div>
                <div class="movie-details-container">
                    <div class="like-container">
                        <img class="like-image" src="https://cdn-icons-png.flaticon.com/512/10037/10037207.png"></img>
                    </div>
                    <div class="add-to-watchlist-button-container">
                        <i class="fa-sharp fa-solid fa-bookmark"></i>
                    </div>
                </div>
            </div>
            `;
            moviesCardContainer.appendChild(element);
        })
    }
}


// // greeting the user

// const greeting = document.querySelector('.greet');

// const date = new Date();
// const hour = date.getHours();

// if (hour > 4 && hour < 12) {
//     greeting.innerHTML = "Good Morning";
// } else if (hour > 12 && hour < 18) {
//     greeting.innerHTML = "Good Afternoon";
// } else if (hour > 18 && hour < 22) {
//     greeting.innerHTML = "Good Evening";
// } else {
//     greeting.innerHTML = "Good Night";
// }