const apiBaseUrl = 'https://api.themoviedb.org/3/';
const apiKey = '53aad5b72ff0ab7191c9db46693916a7';

const discoverUrl = new URL(apiBaseUrl + 'discover/movie');
discoverUrl.searchParams.append('sort_by', 'popularity.desc');
discoverUrl.searchParams.append('page', '1');
discoverUrl.searchParams.append('api_key', apiKey);

const searchUrl = new URL(apiBaseUrl + 'search/movie');
searchUrl.searchParams.append('api_key', apiKey);

const form = document.getElementById('form');
const search = document.getElementById('search');
const main = document.getElementById('main');

getMovies(discoverUrl.href).then();

async function getMovies(url) {
    const res = await fetch(url);
    const data = await res.json();

    showMovies(data.results);
}

function showMovies(movies) {
  main.innerHTML = '';

  movies.forEach((movie) => {
    const { title, poster_path, vote_average, overview } = movie;

    const movieEl = document.createElement('div');
    movieEl.classList.add('movie');
    main.appendChild(movieEl);

    const imgEl = document.createElement('img');
    imgEl.src = 'https://image.tmdb.org/t/p/original' + poster_path;
    imgEl.alt = title;
    movieEl.appendChild(imgEl);

    const movieInfoEl = document.createElement('div');
    movieInfoEl.classList.add('movie-info');
    movieEl.appendChild(movieInfoEl);

    const movieTitleEl = document.createElement('h3');
    movieTitleEl.innerText = title;
    movieInfoEl.appendChild(movieTitleEl);

    const movieRateEl = document.createElement('span');
    movieRateEl.classList.add(getClassByRate(vote_average));
    movieRateEl.innerText = vote_average;
    movieInfoEl.appendChild(movieRateEl);

    const movieOverviewEl = document.createElement('div');
    movieOverviewEl.classList.add('overview');
    movieEl.appendChild(movieOverviewEl);

    const movieOverviewTitleEl = document.createElement('h3');
    movieOverviewTitleEl.innerText = 'Overview';
    movieOverviewEl.appendChild(movieOverviewTitleEl)

    const movieOverviewTextEl = document.createElement('span');
    movieOverviewTextEl.innerText = overview;
    movieOverviewEl.appendChild(movieOverviewTextEl)
  });
}

function getClassByRate(vote) {
  if (vote >= 8) {
    return 'green';
  } else if (vote >= 5) {
    return 'orange';
  } else {
    return 'red';
  }
}


form.addEventListener('submit', (e) => {
  e.preventDefault();

  const searchTerm = search.value;

  if (searchTerm && searchTerm !== '') {
    searchUrl.searchParams.delete('query');
    searchUrl.searchParams.append('query', `"${searchTerm}"`);
    getMovies(searchUrl.href).then();
    search.value = '';
  } else {
    window.location.reload();
  }

});
