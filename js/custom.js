const API_URL = 'https://api.themoviedb.org/3/search/movie?&api_key=2e04702ff356a8c7d4f26b0b707ad5eb&query=';
const API_KEY = '2e04702ff356a8c7d4f26b0b707ad5eb';

const searchInput = document.querySelector('#searchInput');
const moviesList = document.querySelector('#movies-list');
const emptySearchPopUp = document.querySelector('#emptySearchPopUp');
const preloaderBlock = document.querySelector('#preloader');
var moviesArr = [];

window.onload = () => {
  preloaderBlock.style.display = 'none';
  searchInput.focus();
};

window.onclick = () => {
  searchInput.focus();
};

searchInput.addEventListener('input', (e) => {
  e.preventDefault();
  moviesList.innerHTML = '';
  let search = searchInput.value;

  if(search.length >= 3){
    emptySearchPopUp.classList.add('hidden');

    getMoviesData(API_URL + search);
  } 
  else {
    moviesList.innerHTML = '';
    emptySearchPopUp.classList.remove('hidden');
  }
  
  moviesArr = [];
})

function getMoviesData(url){
  fetch(url)
    .then((url) => {
      return url.json();
    })
    .then((data) => {
      getMovieInfo(data)
    })
    .catch((error) => {
      alert(`Error --> ${error}`);
    })
}

function getMovieInfo(movies) {
  movies.results.forEach(movie => {
    if(movie.poster_path && movie.overview){
      const movies = renderMovies(movie);
      moviesArr.push(movie.title);

      moviesList.innerHTML += movies;
    } 
  });

  showMessage(moviesList)
}

function showMessage(list) {
  if(!list.hasChildNodes()){
    emptySearchPopUp.classList.remove('hidden');
  }

  console.log(moviesArr);
}

function renderMovies(movie) {
    var htmlMarkUp = `
      <li>
        <figure>
          <figcaption><h3>${movie.title}</h3></figcaption>
          <img src="https://image.tmdb.org/t/p/w300_and_h450_bestv2${movie.poster_path}" alt=""/>
        </figure>
        <div class="overview">
          <h3>Overview</h3>
          <p>${movie.overview}</p>
        </div>
      </li>
    `

  return htmlMarkUp;
}