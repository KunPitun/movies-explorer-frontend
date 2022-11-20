import { URL } from "./Constants";

export const getUserData = () => {
  return fetch(`${URL.mainApiBaseUrl}/users/me`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'authorization': `Bearer ${localStorage.getItem('jwt')}`,
    }
  })
    .then(checkResponse);
}

export const giveUserInfo = (name, email) => {
  return fetch(`${URL.mainApiBaseUrl}/users/me`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
      'authorization': `Bearer ${localStorage.getItem('jwt')}`,
    },
    body: JSON.stringify({
      name: name,
      email: email
    })
  })
    .then(checkResponse);
}

export const getUserMovies = () => {
  return fetch(`${URL.mainApiBaseUrl}/movies`, {
    headers: {
      'Content-Type': 'application/json',
      'authorization': `Bearer ${localStorage.getItem('jwt')}`,
    }
  })
    .then(checkResponse);
}

export const giveUserMovieInfo = (movie) => {
  return fetch(`${URL.mainApiBaseUrl}/movies`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'authorization': `Bearer ${localStorage.getItem('jwt')}`,
    },
    body: JSON.stringify(movie)
  })
    .then(checkResponse);
}

export const deleteUserMovie = (movieId) => {
  return fetch(`${URL.mainApiBaseUrl}/movies/${movieId}`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
      'authorization': `Bearer ${localStorage.getItem('jwt')}`,
    }
  })
    .then(checkResponse);
}

const checkResponse = (res) => {
  if (res.ok) {
    return res.json();
  }
  return Promise.reject({ message: `Ошибка ${res.status}`, status: res.status });
}