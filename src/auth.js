import { URL } from "./utils/Urls";

export const register = (name, email, password) => {
  return fetch(`${URL.mainApiBaseUrl}/signup`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      email: email,
      password: password,
      name: name,
    })
  })
    .then(checkResponse);
};

export const authorize = (email, password) => {
  return fetch(`${URL.mainApiBaseUrl}/signin`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      email: email,
      password: password
    })
  })
    .then(checkResponse)
    .then((data) => {
      localStorage.setItem('jwt', data.token);
      return data;
    })
};

export const checkToken = (token) => {
  return fetch(`${URL.mainApiBaseUrl}/users/me`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'authorization': `Bearer ${token}`,
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
