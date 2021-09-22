const addMovieModal = document.getElementById("add-modal");
const startAddMovieButton = document.querySelector("header button");
const backdrop = document.getElementById("backdrop");
const cancelAddMovieButton = addMovieModal.querySelector(".btn--passive");
const confirmAddMovieButton = addMovieModal.querySelector(".btn--success");
const userInputs = addMovieModal.querySelectorAll("input");
const entryTextSection = document.getElementById('entry-text');
const deleteMovieModal = document.getElementById('delete-modal');
const movies = [];


function updateUI() {
  if(movies.length === 0) {
    entryTextSection.style.display = 'block';
  } else {
    entryTextSection.style.display = 'none';
  }
}

function closeMovieDeletion() {
  backDropToggle();
  deleteMovieModal.classList.remove('visible');
}

function deleteMovie(movieId) {
  let movieIndex = 0
  for(const movie of movies) {
    if(movie.id === movieId) {
      break;
    }
    movieIndex++
  }
  movies.splice(movieIndex, 1);
  const listRoot = document.getElementById('movie-list');
  listRoot.children[movieIndex].remove();
  closeMovieDeletion();
  updateUI();
}

function startDeleteMoviehandler(movieId) {
  deleteMovieModal.classList.add('visible');
  backDropToggle();
  const cancelDeletionButton = deleteMovieModal.querySelector('.btn--passive');
  let confirmDeletionButton = deleteMovieModal.querySelector('.btn--danger');

  confirmDeletionButton.replaceWith(confirmDeletionButton.cloneNode(true));

  confirmDeletionButton = deleteMovieModal.querySelector('.btn--danger');

  cancelDeletionButton.removeEventListener('click', closeMovieDeletion);

  cancelDeletionButton.addEventListener('click', closeMovieDeletion);
  confirmDeletionButton.addEventListener('click', deleteMovie.bind(null, movieId));
}

function renderNewMovie(id, title, imageUrl, rating) {
  const newMovie = document.createElement('li');
  newMovie.className = 'movie-element';
  newMovie.innerHTML = `
  <div class="movie-element__image">
    <img src="${imageUrl}" alt="${title}">
  </div>
  <div class="movie-element__info">
    <h2>${title}</h2>
    <p>${rating}/5 stars</p>
  </div>
  `;
  newMovie.addEventListener('click', startDeleteMoviehandler.bind(null, id));
  const listRoot = document.getElementById('movie-list');
  listRoot.append(newMovie);
}

function backDropToggle() {
  backdrop.classList.toggle("visible");
}

function closeMovieModal() {
  addMovieModal.classList.remove('visible');
}

function cancelAddMovie() {
  closeMovieModal();
  backDropToggle();
  clearMovieInputs();
} 

function showMovieModal() {
  addMovieModal.classList.add("visible");
  backDropToggle();
}

function clearMovieInputs() {
  for(const input of userInputs) {
    input.value = '';
  }
}

function addMovieHandler() {
  const titleValue = userInputs[0].value;
  const imageUrlValue = userInputs[1].value;
  const ratingValue = userInputs[2].value;

  if (
    titleValue.trim() === "" ||
    imageUrlValue.trim() === "" ||
    ratingValue === "" ||
    +ratingValue < 1 ||
    +ratingValue > 5
  ) {
    alert('Por favor, adidicone valores válidos. Classificação de 1 a 5, uma imagem e o título do filme!');
    return;
  }
  
  const newMovie = {
    id: Math.random().toString(),
    title: titleValue,
    image: imageUrlValue,
    rating: ratingValue
  };

  movies.push(newMovie);
  console.log(movies);
  closeMovieModal();
  clearMovieInputs();
  backDropToggle();
  renderNewMovie(newMovie.id, newMovie.title, newMovie.image, newMovie.rating);
  updateUI();
}

function backdropClickHandler() {
  closeMovieModal();
  closeMovieDeletion();
  clearMovieInputs();
}

startAddMovieButton.addEventListener("click", showMovieModal);
backdrop.addEventListener("click", backdropClickHandler);
cancelAddMovieButton.addEventListener("click", cancelAddMovie);
confirmAddMovieButton.addEventListener("click", addMovieHandler);
