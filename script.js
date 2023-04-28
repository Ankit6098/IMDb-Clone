const searchInput = document.getElementById('search-input');
const voiceSearch = document.querySelector('.mic-search-icon-container');
const micIcon = document.querySelector('.mic-icon');

const searchbarContainer = document.querySelector('.searchbar-container');
const moviesCardContainer = document.querySelector('.movies-card-container');
const searchSlogon = document.querySelector('.search-slogon');

const homeContainer = document.querySelector('.home-container');
const searchBody = document.querySelector('.search-body');

const apiUrl = "https://www.omdbapi.com/?s=";
// const apiKey = "&apikey=72b8c020";

// website logo 

const websiteLogo = document.querySelector('.website-logo');

websiteLogo.addEventListener('click', () => {
    homeContainer.classList.add('active');
    searchBody.classList.remove('active');
    home.classList.add('active');
    search.classList.remove('active');
    watchlist.classList.remove('active');
    favourite.classList.remove('active');
    contactUs.classList.remove('active');
});

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
            console.log(data);

            // movie genre
            if (data.Genre == "N/A") {
                data.Genre = "";
            } else {
                data.Genre = data.Genre;
            }

            // movie plot
            if (data.Plot == "N/A") {
                data.Plot = "";
            } else {
                data.Plot = data.Plot;
            }

            // movie ratings
            if (data.imdbRating == "N/A") {
                data.imdbRating = "";
            } else if (data.imdbRating >= 9) {
                data.imdbRating = `<i class="fa-solid fa-solid fa-star"></i><i class="fa-solid fa-solid fa-star"></i><i class="fa-solid fa-solid fa-star"></i><i class="fa-solid fa-solid fa-star"></i><i class="fa-solid fa-solid fa-star"></i>`
            } else if (data.imdbRating >= 7) {
                data.imdbRating = `<i class="fa-solid fa-solid fa-star"></i><i class="fa-solid fa-solid fa-star"></i><i class="fa-solid fa-solid fa-star"></i><i class="fa-solid fa-solid fa-star"></i>`
            } else if (data.imdbRating >= 5) {
                data.imdbRating = `<i class="fa-solid fa-solid fa-star"></i><i class="fa-solid fa-solid fa-star"></i><i class="fa-solid fa-solid fa-star"></i>`
            } else if (data.imdbRating >= 3) {
                data.imdbRating = `<i class="fa-solid fa-solid fa-star"></i><i class="fa-solid fa-solid fa-star"></i>`
            } else if (data.imdbRating >= 1) {
                data.imdbRating = `<i class="fa-solid fa-solid fa-star"></i>`
            }

            // movie year

            if (data.Year == "N/A") {
                data.Year = "";
            } else {
                data.Year = data.Year;
            }

            // movie rated

            if (data.Rated == "N/A") {
                data.Rated = "Not Rated";
            } else {
                data.Rated = data.Rated;
            }
            
            // adding movie card
            const element = document.createElement('div');
            element.classList.add('movie-card');
            if (data.Poster == "N/A") {
                element.innerHTML = `
                    <div class="no-poster-card">
                        <img class="no-poster-movie-image" src="https://static.displate.com/857x1200/displate/2022-04-15/7422bfe15b3ea7b5933dffd896e9c7f9_46003a1b7353dc7b5a02949bd074432a.jpg" alt="">
                        <div class="no-poster-movie-info-container">
                            <div class="card-actions">
                                <div class="like-container">
                                    <img class="like-image" src="https://cdn-icons-png.flaticon.com/512/10037/10037207.png"></img>
                                </div>
                                <div class="watchlist-button-container">
                                    <i class="fa-sharp fa-solid fa-bookmark"></i>
                                </div>
                            </div>
                            <div class="movie-title-container">
                                <h3 class="movie-title">${data.Title}</h3>
                            </div>
                            <div class="movie-year-rating-container">
                                <p class="movie-rating">${data.imdbRating}</p>
                                <p class="movie-year">${data.Year}</p>
                                <p class="movie-rated">${data.Rated}</p>
                            </div>
                            <div class="movie-plot-container">
                                <p class="movie-plot">${data.Plot}</p>
                            </div>
                            <div class="movie-genre-container">
                                <p class="movie-genre">${data.Genre}</p>
                            </div>
                        </div>
                    </div>
                `
            } else {
            element.innerHTML = `
                <div class="card">
                    <div class="movie-image-container">
                        <img class="movie-image" src="${data.Poster}"></img>
                    </div>
                    <div class="card-actions">
                        <div class="like-container">
                            <img class="like-image" src="https://cdn-icons-png.flaticon.com/512/10037/10037207.png"></img>
                        </div>
                        <div class="watchlist-button-container">
                            <i class="fa-sharp fa-solid fa-bookmark"></i>
                        </div>
                    </div>
                    <div class="movie-info-container">
                        <div class="movie-title-container">
                            <h3 class="movie-title">${data.Title}</h3>
                        </div>
                        <div class="movie-year-rating-container">
                            <p class="movie-rating">${data.imdbRating}</p>
                            <p class="movie-year">${data.Year}</p>
                            <p class="movie-rated">${data.Rated}</p>
                        </div>
                        <div class="movie-plot-container">
                            <p class="movie-plot">${data.Plot}</p>
                        </div>
                        <div class="movie-genre-container">
                            <p class="movie-genre">${data.Genre}</p>
                        </div>
                    </div>
                </div>
            `
        }
        moviesCardContainer.appendChild(element);
        })
    }
}


// watchlist button

// const watchList = document.querySelector('.watchlist-button-container');

// watchList.addEventListener('click', () => {
//     watchList.classList.toggle('active');
// })


// function to get rating is in decimal or not

function isDecimal(n) {
    return n != "" && Number(n) == n && n % 1 !== 0;
}


// console the developer info

console.log("%c Hey! it's Ankit Vishwakarma,", "color : #00000; font-size : 1rem; font-weight : bold;");
console.log("%c Passionate Full Stack Developer.", "color : #00000; font-size : 0.7rem; font-weight : bold;");
