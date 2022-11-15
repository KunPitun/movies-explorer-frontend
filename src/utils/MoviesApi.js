const BASE_URL = 'https://api.nomoreparties.co/beatfilm-movies';
const UPLOADS_URL = 'https://api.nomoreparties.co';

export const getAllMovies = () => {
  return fetch(`${BASE_URL}/`, {
    headers: {
      'Content-Type': 'application/json',
    }
  })
    .then((res) => {
      if (res.ok) {
        return res.json();
      }
      return Promise.reject(`Ошибка ${res.status}`);
    })
    .then((movies) => {
      return movies.map((movie) => {
        return {
          movieId: movie.id,
          nameRU: movie.nameRU,
          nameEN: movie.nameEN,
          director: movie.director,
          country: movie.country,
          year: movie.year,
          duration: movie.duration,
          description: movie.description,
          trailerLink: movie.trailerLink,
          image: UPLOADS_URL + movie.image.url,
          thumbnail: UPLOADS_URL + movie.image.formats.thumbnail.url,
        };
      });
    })
}