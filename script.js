const movieMoreInfoContainer = document.querySelector('.movie-more-info-container');
const navContainer = document.querySelector('.nav-container');
const watchlistCardContainer = document.querySelector('.watchlist-card-container');
const favouritelistCardContainer = document.querySelector('.favourite-card-container');

const apiUrl = "https://www.omdbapi.com/?s=";
const apiKey = "&apikey=72b8c020";
// const apiKey = "&apikey=500472f0";


// website logo 
const websiteLogo = document.querySelector('.website-logo');
const footer = document.querySelector('footer');

websiteLogo.addEventListener('click', () => {
    window.location.reload();
});

// moblie navbar
const mobileMenuButton = document.querySelector('.mobile-navbar-button');
const navUL = document.querySelector('.nav-ul');


mobileMenuButton.addEventListener('click', () => {
    websiteLogo.style.pointerEvents = 'none';
    navUL.classList.toggle('active');
    homeContainer.style.zIndex = '-1';
    searchBody.style.zIndex = '-1';
    watchlistBody.style.zIndex = '-1';
    favouriteBody.style.zIndex = '-1';
    moviesCardContainer.style.zIndex = '-10';
    websiteLogo.style.filter = 'blur(5px)';
    footer.style.filter = 'blur(5px)';
    homeContainer.style.filter = 'blur(5px)';
    searchBody.style.filter = 'blur(5px)';
    watchlistBody.style.filter = 'blur(5px)';
    favouriteBody.style.filter = 'blur(5px)';
})

function closeNavMenu() {
        navUL.classList.remove('active');
        homeContainer.style.zIndex = '1';
        searchBody.style.zIndex = '1';
        watchlistBody.style.zIndex = '1';
        favouriteBody.style.zIndex = '1';
        websiteLogo.style.filter = 'blur(0px)';
        footer.style.filter = 'blur(0px)';
        homeContainer.style.filter = 'blur(0px)';
        searchBody.style.filter = 'blur(0px)';
        watchlistBody.style.filter = 'blur(0px)';
        favouriteBody.style.filter = 'blur(0px)';
}

// voice search
const searchInput = document.getElementById('search-input');
const voiceSearch = document.querySelector('.mic-search-icon-container');
const micIcon = document.querySelector('.mic-icon');
const searchIcon = document.querySelector('.fa-magnifying-glass');

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

// fetch movies through api
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

// fetch user input
const searchbarContainer = document.querySelector('.searchbar-container');
const moviesCardContainer = document.querySelector('.movies-card-container');
const searchSlogon = document.querySelector('.search-slogon');

function userInput() {
    searchInput.addEventListener('input', () => {
        searchBody.style.height = "90vh";

        if (searchInput.value == "") {
            moviesCardContainer.style.display = "none";
            searchSlogon.style.display = "block";
            searchbarContainer.style.marginBottom = "50px";
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

// navbar controllers
const home = document.querySelector('.home');
const search = document.querySelector('.search');
const watchlist = document.querySelector('.watchlist');
const favourite = document.querySelector('.favourite');
const contactUs = document.querySelector('.contact-us');

const homeContainer = document.querySelector('.home-container');
const searchBody = document.querySelector('.search-body');
const watchlistBody = document.querySelector('.watchlist-body');
const favouriteBody = document.querySelector('.favourite-body');


home.addEventListener('click', () => {
    console.log('home clicked');
    home.classList.add('active');
    search.classList.remove('active');
    watchlist.classList.remove('active');
    favourite.classList.remove('active');
    contactUs.classList.remove('active');
    homeContainer.classList.add('active');
    searchBody.classList.remove('active');
    watchlistBody.classList.remove('active');
    favouriteBody.classList.remove('active');
    closeNavMenu();
});

search.addEventListener('click', () => {
    search.classList.add('active');
    home.classList.remove('active');
    watchlist.classList.remove('active');
    favourite.classList.remove('active');
    contactUs.classList.remove('active');
    searchBody.classList.add('active');
    homeContainer.classList.remove('active');
    watchlistBody.classList.remove('active');
    favouriteBody.classList.remove('active');
    closeNavMenu();
});

watchlist.addEventListener('click', () => {
    watchlist.classList.add('active');
    home.classList.remove('active');
    search.classList.remove('active');
    favourite.classList.remove('active');
    favouriteBody.classList.remove('active');
    watchlistBody.classList.add('active');
    contactUs.classList.remove('active');
    searchBody.classList.remove('active');
    homeContainer.classList.remove('active');
    closeNavMenu();
});

favourite.addEventListener('click', () => {
    favourite.classList.add('active');
    favouriteBody.classList.add('active');
    watchlistBody.classList.remove('active');
    searchBody.classList.remove('active');
    home.classList.remove('active');
    search.classList.remove('active');
    watchlist.classList.remove('active');
    contactUs.classList.remove('active');
    homeContainer.classList.remove('active');
    closeNavMenu();
});

contactUs.addEventListener('click', () => {
    contactUs.classList.add('active');
    closeNavMenu();
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

            renderCard(element, data);
            moviesCardContainer.appendChild(element);
        })
        .catch(err =>
            `
                <div class="error">
                    <h1>404 error Something went wrong!</h1>
                    <p>${err}</p>
                </div>
            `
        );
    }
}

// function to get the movie more info
function moreInfo(imdbID) {
    movieMoreInfoContainer.style.opacity = "1";
    movieMoreInfoContainer.style.pointerEvents = "all";
    movieMoreInfoContainer.style.zIndex = "2";
    navContainer.style.filter = "blur(5px)";
    searchInput.style.filter = "blur(5px)";
    searchIcon.style.filter = "blur(5px)";
    searchIcon.style.zIndex = "1";
    micIcon.style.filter = "blur(5px)";
    moviesCardContainer.style.filter = "blur(5px)";
    navContainer.style.pointerEvents = "none";
    searchInput.style.pointerEvents = "none";
    searchIcon.style.pointerEvents = "none";
    micIcon.style.pointerEvents = "none";
    moviesCardContainer.style.pointerEvents = "none";

    fetch(`https://www.omdbapi.com/?i=${imdbID}&apikey=72b8c020`)
    .then(response => response.json())
    .then(data => {
        console.log(data);

        // img
        if (data.Poster == "N/A") {
            data.Poster = "https://static.displate.com/857x1200/displate/2022-04-15/7422bfe15b3ea7b5933dffd896e9c7f9_46003a1b7353dc7b5a02949bd074432a.jpg";
        } else {
            data.Poster = data.Poster;
        }

        // storging movie rating
        let movieRating = data.imdbRating;

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

        // Rating
        if (data.Rated == "N/A") {
            movieRating = "No";
        } else {
            data.Rated = data.Rated;
        }

        // plot
        if (data.Plot == "N/A") {
            data.Plot = "Plot not available";
        } else {
            data.Plot = data.Plot;
        }

        // production
        if (data.Production == "N/A") {
            data.Production = "unknown";
        } else {
            data.Production = data.Production;
        }

        // actors
        if (data.Actors == "N/A") {
            data.Actors = "unknown";
        } else {
            data.Actors = data.Actors;
        }

        // director
        if (data.Director == "N/A") {
            data.Director = "unknown";
        } else {
            data.Director = data.Director;
        }

        // writer
        if (data.Writer == "N/A") {
            data.Writer = "unknown";
        } else {
            data.Writer = data.Writer;
        }

        // awards
        if (data.Awards == "N/A") {
            data.Awards = "unknown";
        } else {
            data.Awards = data.Awards;
        }

        // box office
        if (data.BoxOffice == "N/A") {
            data.BoxOffice = "unknown";
        } else {
            data.BoxOffice = data.BoxOffice;
        }

        // country
        if (data.Country == "N/A") {
            data.Country = "unknown";
        } else {
            data.Country = data.Country;
        }

        // metascore
        if (data.Metascore == "N/A") {
            data.Metascore = "unknown";
        } else {
            data.Metascore = data.Metascore;
        }

        const element = document.createElement('div');
        element.classList.add('movie-more-info');

        // rendering movie more info
        renderMovieMoreInfo(element, data, movieRating);
        movieMoreInfoContainer.appendChild(element);

        // handling watchlist and favorite list innerHTML
        if (watchlistLocalStorage.includes(data.imdbID)) {
            document.querySelector(".add-to-watchlist-button").innerHTML = "Remove from Watchlist";
        } else {
            document.querySelector(".add-to-watchlist-button").innerHTML = "Add to Watchlist";
        }
        if (favouriteListLocalStorage.includes(data.imdbID)) {
            document.querySelector(".add-to-favorites-button").innerHTML = "Remove from Favorites";
        } else {
            document.querySelector(".add-to-favorites-button").innerHTML = "Add to Favorites";
        }
    })
}

// function to close more info
function closeMoreInfo() {
    movieMoreInfoContainer.style.opacity = "0";
    movieMoreInfoContainer.style.pointerEvents = "none";
    movieMoreInfoContainer.style.zIndex = "-1";
    navContainer.style.filter = "blur(0px)";
    searchInput.style.filter = "blur(0px)";
    searchIcon.style.filter = "blur(0px)";
    searchIcon.style.zIndex = "1";
    micIcon.style.filter = "blur(0px)";
    moviesCardContainer.style.filter = "blur(0px)";
    navContainer.style.pointerEvents = "auto";
    searchInput.style.pointerEvents = "auto";
    searchIcon.style.pointerEvents = "auto";
    micIcon.style.pointerEvents = "auto";
    moviesCardContainer.style.pointerEvents = "auto";
    movieMoreInfoContainer.innerHTML = "";
}

// funtion to store watchlist in local storage
let watchlistLocalStorage = JSON.parse(localStorage.getItem('watchlistLocalStorage'));

if(watchlistLocalStorage == null) {
    watchlistLocalStorage = [];
}

function addMovieToWatchlist(movieId) {
    if (watchlistLocalStorage.includes(movieId)) {
        warningNoty("Movie removed from Watchlist");
    } else {
        successNoty("Movie added to Watchlist");
    }

    if (movieMoreInfoContainer.style.opacity == "1") {
        const movieMoreInfoWatchlistButton = document.getElementById(`_watchlist-button-${movieId}`);
        if (watchlistLocalStorage.includes(movieId)) {
            movieMoreInfoWatchlistButton.innerHTML = "Add to Watchlist";
        } else {
            movieMoreInfoWatchlistButton.innerHTML = "Remove From Watchlist";
        }
    }

    const watchlistIcon = document.getElementById(`_watchlistIcon-${movieId}`);
    watchlistIcon.classList.toggle("active");
    if (watchlistIcon.classList.contains("active")) {
        watchlistIcon.src = "https://cdn-icons-png.flaticon.com/512/786/786453.png";
    } else {
        watchlistIcon.src = "https://cdn-icons-png.flaticon.com/512/4485/4485491.png";
    }

    let index = watchlistLocalStorage.indexOf(movieId);
    if (index !== -1) {
        watchlistLocalStorage.splice(index, 1);
        localStorage.setItem('watchlistLocalStorage', JSON.stringify(watchlistLocalStorage));
        showWatchlist();
        showFavouriteList();
        return;
    }

    watchlistLocalStorage.push(movieId);
    localStorage.setItem('watchlistLocalStorage', JSON.stringify(watchlistLocalStorage));
    showWatchlist();
    showFavouriteList();
}


// funtion to show watchlist
function showWatchlist() {
    watchlistCardContainer.innerHTML = "";
    if (watchlistLocalStorage.length == "") {
        watchlistCardContainer.innerHTML = `
            <div class="no-movie-in-watchlist-container">
                <h2 class="no-movie-in-watchlist-text">No Movie in Watchlist</h2>
            </div>
        `
    } else {
        for (let i = 0; i < watchlistLocalStorage.length; i++) {
            fetch(`https://www.omdbapi.com/?i=${watchlistLocalStorage[i]}&apikey=72b8c020`)
            .then((response) => response.json())
            .then((data) => {

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

                let element = document.createElement('div');
                element.classList.add('watchlist-movie-card');

                renderCard(element, data);
                watchlistCardContainer.appendChild(element);
            })
        }
    }
}
showWatchlist();


// funtion to store favourite list in local storage
let favouriteListLocalStorage = JSON.parse(localStorage.getItem('favouriteListLocalStorage'));

if(favouriteListLocalStorage == null) {
    favouriteListLocalStorage = [];
}

function addMovieToFavouriteList(movieId) {
    if (favouriteListLocalStorage.includes(movieId)) {
        warningNoty("Movie removed from favoritelist");
    } else {
        successNoty("Movie added to favoritelist");
    }

    if (movieMoreInfoContainer.style.opacity == "1") {
        const movieMoreInfoFavoritelistButton = document.getElementById(`_favoriteslist-button-${movieId}`);
        if (favouriteListLocalStorage.includes(movieId)) {
            movieMoreInfoFavoritelistButton.innerHTML = "Add to Favoritelist";
        } else {
            movieMoreInfoFavoritelistButton.innerHTML = "Remove From Favoritelist";
        }
    }

    const favouritelistIcon = document.getElementById(`_favouritelistIcon-${movieId}`);
    favouritelistIcon.classList.toggle('active');
    if (favouritelistIcon.classList.contains('active')) {
        favouritelistIcon.src="https://cdn-icons-png.flaticon.com/512/210/210545.png";
    } else {
        favouritelistIcon.src="https://cdn-icons-png.flaticon.com/512/10037/10037207.png";
    }
    
    let index = favouriteListLocalStorage.indexOf(movieId);
    if (index !== -1) {
        favouriteListLocalStorage.splice(index, 1);
        localStorage.setItem('favouriteListLocalStorage', JSON.stringify(favouriteListLocalStorage));
        showFavouriteList();
        showWatchlist();
        return;
    }

    favouriteListLocalStorage.push(movieId);
    localStorage.setItem('favouriteListLocalStorage', JSON.stringify(favouriteListLocalStorage));
    showFavouriteList();
    showWatchlist();
}


// funtion to show favourite list
function showFavouriteList() {
    favouritelistCardContainer.innerHTML = "";
    if (favouriteListLocalStorage.length == "") {
        favouritelistCardContainer.innerHTML = `
            <div class="no-movie-in-favouriteList-container">
                <h2 class="no-movie-in-favouriteList-text">No Movie in FavourList</h2>
            </div>
        `
    } else {
        for (let i = 0; i < favouriteListLocalStorage.length; i++) {
            fetch(`https://www.omdbapi.com/?i=${favouriteListLocalStorage[i]}&apikey=72b8c020`)
            .then((response) => response.json())
            .then((data) => {

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

                let element = document.createElement('div');
                element.classList.add('favourite-list-movie-card');

                renderCard(element, data);
                favouritelistCardContainer.appendChild(element);
            })
        }
    }
}
showFavouriteList();

// console the developer info
console.log("%c Hey! it's Ankit Vishwakarma,", "color : #00000; font-size : 1rem; font-weight : bold;");
console.log("%c Passionate Full Stack Developer.", "color : #00000; font-size : 0.7rem; font-weight : bold;");

// funtion to render movie card
function renderCard(element, data) {
    if (watchlistLocalStorage.includes(data.imdbID) && favouriteListLocalStorage.includes(data.imdbID)) {
        if (data.Poster == "N/A") {
            element.innerHTML = `
                <div class="no-poster-card">
                    <img class="no-poster-movie-image" src="https://static.displate.com/857x1200/displate/2022-04-15/7422bfe15b3ea7b5933dffd896e9c7f9_46003a1b7353dc7b5a02949bd074432a.jpg" alt="">
                    <div class="no-poster-movie-info-container">
                        <div class="card-actions">
                            <div onclick="addMovieToFavouriteList('${data.imdbID}')" class="like-container">
                                <img class="like-image active" id="_favouritelistIcon-${data.imdbID}" src="https://cdn-icons-png.flaticon.com/512/210/210545.png"></img>
                            </div>
                            <div onclick="addMovieToWatchlist('${data.imdbID}')"class="watchlist-button-container">
                                <img class="watchlist-button-image active" id="_watchlistIcon-${data.imdbID}"src="https://cdn-icons-png.flaticon.com/512/786/786453.png"></img>
                            </div>
                        </div>
                        <div class="movie-title-container" onclick="moreInfo('${data.imdbID}')">
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
                        <div onclick="addMovieToFavouriteList('${data.imdbID}')" class="like-container">
                            <img class="like-image active" id="_favouritelistIcon-${data.imdbID}" src="https://cdn-icons-png.flaticon.com/512/210/210545.png"></img>
                        </div>
                        <div onclick="addMovieToWatchlist('${data.imdbID}')" class="watchlist-button-container">
                            <img class="watchlist-button-image active" id="_watchlistIcon-${data.imdbID}"src="https://cdn-icons-png.flaticon.com/512/786/786453.png"></img>
                        </div>
                    </div>
                    <div class="movie-info-container" onclick="moreInfo('${data.imdbID}')">
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
    } else if (watchlistLocalStorage.includes(data.imdbID)) {
        if (data.Poster == "N/A") {
            element.innerHTML = `
                <div class="no-poster-card">
                    <img class="no-poster-movie-image" src="https://static.displate.com/857x1200/displate/2022-04-15/7422bfe15b3ea7b5933dffd896e9c7f9_46003a1b7353dc7b5a02949bd074432a.jpg" alt="">
                    <div class="no-poster-movie-info-container">
                        <div class="card-actions">
                            <div onclick="addMovieToFavouriteList('${data.imdbID}')" class="like-container">
                                <img class="like-image" id="_favouritelistIcon-${data.imdbID}" src="https://cdn-icons-png.flaticon.com/512/10037/10037207.png"></img>
                            </div>
                            <div onclick="addMovieToWatchlist('${data.imdbID}')"class="watchlist-button-container">
                                <img class="watchlist-button-image active" id="_watchlistIcon-${data.imdbID}"src="https://cdn-icons-png.flaticon.com/512/786/786453.png"></img>
                            </div>
                        </div>
                        <div class="movie-title-container" onclick="moreInfo('${data.imdbID}')">
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
                        <div onclick="addMovieToFavouriteList('${data.imdbID}')" class="like-container">
                            <img class="like-image" id="_favouritelistIcon-${data.imdbID}" src="https://cdn-icons-png.flaticon.com/512/10037/10037207.png"></img>
                        </div>
                        <div onclick="addMovieToWatchlist('${data.imdbID}')" class="watchlist-button-container">
                            <img class="watchlist-button-image active" id="_watchlistIcon-${data.imdbID}"src="https://cdn-icons-png.flaticon.com/512/786/786453.png"></img>
                        </div>
                    </div>
                    <div class="movie-info-container" onclick="moreInfo('${data.imdbID}')">
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
    } else if (favouriteListLocalStorage.includes(data.imdbID)) {
        if (data.Poster == "N/A") {
            element.innerHTML = `
                <div class="no-poster-card">
                    <img class="no-poster-movie-image" src="https://static.displate.com/857x1200/displate/2022-04-15/7422bfe15b3ea7b5933dffd896e9c7f9_46003a1b7353dc7b5a02949bd074432a.jpg" alt="">
                    <div class="no-poster-movie-info-container">
                        <div class="card-actions">
                            <div onclick="addMovieToFavouriteList('${data.imdbID}')" class="like-container">
                                <img class="like-image active" id="_favouritelistIcon-${data.imdbID}" src="https://cdn-icons-png.flaticon.com/512/210/210545.png"></img>
                            </div>
                            <div onclick="addMovieToWatchlist('${data.imdbID}')"class="watchlist-button-container">
                                <img class="watchlist-button-image" id="_watchlistIcon-${data.imdbID}"src="https://cdn-icons-png.flaticon.com/512/4485/4485491.png"></img>
                            </div>
                        </div>
                        <div class="movie-title-container" onclick="moreInfo('${data.imdbID}')">
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
                        <div onclick="addMovieToFavouriteList('${data.imdbID}')" class="like-container">
                            <img class="like-image active" id="_favouritelistIcon-${data.imdbID}" src="https://cdn-icons-png.flaticon.com/512/210/210545.png"></img>
                        </div>
                        <div onclick="addMovieToWatchlist('${data.imdbID}')" class="watchlist-button-container">
                            <img class="watchlist-button-image" id="_watchlistIcon-${data.imdbID}"src="https://cdn-icons-png.flaticon.com/512/4485/4485491.png"></img>
                        </div>
                    </div>
                    <div class="movie-info-container" onclick="moreInfo('${data.imdbID}')">
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
    } else {
        if (data.Poster == "N/A") {
            element.innerHTML = `
                <div class="no-poster-card">
                    <img class="no-poster-movie-image" src="https://static.displate.com/857x1200/displate/2022-04-15/7422bfe15b3ea7b5933dffd896e9c7f9_46003a1b7353dc7b5a02949bd074432a.jpg" alt="">
                    <div class="no-poster-movie-info-container">
                        <div class="card-actions">
                            <div onclick="addMovieToFavouriteList('${data.imdbID}')" class="like-container">
                                <img class="like-image" id="_favouritelistIcon-${data.imdbID}" src="https://cdn-icons-png.flaticon.com/512/10037/10037207.png"></img>
                            </div>
                            <div onclick="addMovieToWatchlist('${data.imdbID}')"class="watchlist-button-container">
                                <img class="watchlist-button-image" id="_watchlistIcon-${data.imdbID}"src="https://cdn-icons-png.flaticon.com/512/4485/4485491.png"></img>
                            </div>
                        </div>
                        <div class="movie-title-container" onclick="moreInfo('${data.imdbID}')">
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
                        <div onclick="addMovieToFavouriteList('${data.imdbID}')" class="like-container">
                            <img class="like-image" id="_favouritelistIcon-${data.imdbID}" src="https://cdn-icons-png.flaticon.com/512/10037/10037207.png"></img>
                        </div>
                        <div onclick="addMovieToWatchlist('${data.imdbID}')" class="watchlist-button-container">
                        <img class="watchlist-button-image" id="_watchlistIcon-${data.imdbID}"src="https://cdn-icons-png.flaticon.com/512/4485/4485491.png"></img>
                        </div>
                    </div>
                    <div class="movie-info-container" onclick="moreInfo('${data.imdbID}')">
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
    }
}

function renderMovieMoreInfo(element, data, movieRating) {
    element.innerHTML = `
        <div class="movie-more-info">
            <div class="movie-more-info-image-container">
                <img class="movie-more-info-image" src="${data.Poster}"></img>
            </div>

            <div class="movie-more-info-info-container">
                <div class="movie-more-info-title-container">
                    <span class="movie-more-info-title">${data.Title}&nbsp&nbsp<span class="movie-more-info-year"> ${data.Year}</span></span>
                </div>
                <div class="movie-more-info-genre-container">
                    <span class="movie-more-info-genre">${data.Genre}</span>
                    <span class="movie-more-info-rated">${data.Rated}</span>
                </div>
                <div class="movie-more-info-year-rating-container">
                    <span class="movie-more-info-rating">${data.imdbRating}</span>
                    <span class="movie-more-info-rating-number">&nbsp- ${movieRating} Rating</span>
                </div>
                <div class="movie-more-info-plot-container">
                    <p class="movie-more-info-plot">${data.Plot}</p>
                </div>
                <div class="movie-more-info-type-container">
                    <span class="movie-more-info-type-title">Type: </span>
                    <span class="movie-more-info-type">${data.Type}</span>
                </div>
                <div class="movie-more-info-runtime-container">
                    <span class="movie-more-info-runtime-title">Runtime: </span>
                    <span class="movie-more-info-runtime">${data.Runtime}</span>
                </div>
                <div class="movie-more-info-language-container">
                    <span class="movie-more-info-language-title">Language: </span>
                    <span class="movie-more-info-language">${data.Language}</span>
                </div>
                <div class="movie-more-info-actors-container">
                    <span class="movie-more-info-actors-title">Actors: </span>
                    <span class="movie-more-info-actors">${data.Actors}</span>
                </div>
                <div class="movie-more-info-released-container">
                    <span class="movie-more-info-released-title">Released: </span>
                    <span class="movie-more-info-released">${data.Released}</span>
                </div>
                <div class="movie-more-info-country-container">
                    <span class="movie-more-info-country-title">Country: </span>
                    <span class="movie-more-info-country">${data.Country}</span>
                </div>
                <div class="movie-more-info-director-container">
                    <span class="movie-more-info-director-title">Director: </span>
                    <span class="movie-more-info-director">${data.Director}</span>
                </div>
                <div class="movie-more-info-writer-container">
                    <span class="movie-more-info-writer-title">Writer: </span>
                    <span class="movie-more-info-writer">${data.Writer}</span>
                </div>
                <div class="movie-more-info-production-container">
                    <span class="movie-more-info-production-title">Production: </span>
                    <span class="movie-more-info-production">${data.Production}</span>
                </div>
                <div class="movie-more-info-awards-container">
                    <span class="movie-more-info-awards-title">Awards: </span>
                    <span class="movie-more-info-awards">${data.Awards}</span>
                </div>
                <div class="movie-more-info-box-office-container">
                    <span class="movie-more-info-box-office-title">Box Office: </span>
                    <span class="movie-more-info-box-office">${data.BoxOffice}</span>
                </div>
                <div class="movie-more-info-metascore-container">
                    <span class="movie-more-info-metascore-title">Metascore: </span>
                    <span class="movie-more-info-metascore">${data.Metascore}</span>
                </div>
                <div class="movie-more-info-imdb-votes-container">
                    <span class="movie-more-info-imdb-votes-title">IMDB Votes: </span>
                    <span class="movie-more-info-imdb-votes">${data.imdbVotes}</span>
                </div>

                <div class="action-buttons-container">
                    <div class="add-to-watchlist-container" onclick="addMovieToWatchlist('${data.imdbID}')">
                        <button class="add-to-watchlist-button" id="_watchlist-button-${data.imdbID}">Add to Watchlist</button>
                    </div>
                    <div class="add-to-favorites-container" onclick="addMovieToFavouriteList('${data.imdbID}')">
                        <button class="add-to-favorites-button" id="_favoriteslist-button-${data.imdbID}">Add to Favorites</button>
                    </div>
                </div>
            </div>
            <div onclick="closeMoreInfo()" class="close-more-info-container">
                <i class="fa-solid fa-times"></i>
            </div>
        </div>
    `
}

function successNoty(msg) {
    console.log('toast');
    iziToast.success({
      title: msg,
    //   message: 'This is an Izzi Toast notification!',
      position: 'topRight',
    });
}

function warningNoty(msg) {
    console.log('toast');
    iziToast.warning({
      title: msg,
    //   message: 'This is an Izzi Toast notification!',
      position: 'topRight',
    });
}