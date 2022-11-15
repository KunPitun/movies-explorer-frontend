import { URL } from "./Urls";

export const getAllMovies = () => {
  return fetch(`${URL.moviesApiBaseUrl}/`, {
    headers: {
      'Content-Type': 'application/json',
    }
  })
    .then((res) => {
      if (res.ok) {
        return res.json();
      }
      return Promise.reject({ message: `Ошибка ${res.status}`, status: res.status });
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
          image: URL.moviesApiUploadsUrl + movie.image.url,
          thumbnail: URL.moviesApiUploadsUrl + movie.image.formats.thumbnail.url,
        };
      });
    })
}