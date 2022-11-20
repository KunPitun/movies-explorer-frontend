export const URL = {
  mainApiBaseUrl: 'https://api.kunpitun.diploma.nomoredomains.icu',
  moviesApiBaseUrl: 'https://api.nomoreparties.co/beatfilm-movies',
  moviesApiUploadsUrl: 'https://api.nomoreparties.co',
}

export const MESSAGE = {
  getUserDataError: 'Не удалось получить данные о пользователе! Попробуйте ещё раз.',
  registerError: 'Не удалось зарегистрироваться! Попробуйте ещё раз.',
  registerEmailMatchesPasswordError: 'E-mail не должен совпадать с паролем! Попробуйте ещё раз.',
  registerUserIsAlreadyRegisteredError: 'Пользователь уже зарегистрирован.',
  loginError: 'Не удалось войти! Попробуйте ещё раз.',
  profileUpdate: 'Вы успешно обновили данные профиля!',
  profileUpdateError: 'Не удалось обновить данные пользователя! Попробуйте ещё раз.',
  addMovieError: 'Не удалось сохранить фильм! Попробуйте ещё раз.',
  deleteMovieError: 'Не удалось удалить фильм! Попробуйте ещё раз.',
  nameValidationMissedInputError: 'Вы пропустили это поле.',
  nameValidationInvalidCharacterError: 'Имя может содержать только латиницу, кириллицу, пробел или дефис.',
  jwtErrorMessage: 'В localStorage отсутствует jwt',
}

export const ROUTE_PATH = {
  main: '/',
  movies: '/movies',
  savedMovies: '/saved-movies',
  profile: '/profile',
  signIn: '/signin',
  signUp: '/signup'
}

export const SCREEN_WIDTH = {
  big: 1280,
  middle: 768,
  small: 320
}

export const BASE_QUANTITY_OF_CARDS_FOR_SCREEN_WIDTH = {
  big: 12,
  middle: 8,
  small: 5
}

export const QUANTITY_OF_CARDS_FOR_MORE_BTN_FOR_SCREEN_WIDTH = {
  big: {
    cardsListDivisibleOnlyByTwo: 4,
    cardsListDivisibleByFour: 6,
    cardsListDivisibleByThree: 3,
  },
  middleAndSmall: {
    cardsListDivisibleByTwo: 2,
    cardsListNotDivisibleByTwo: 3,
  }
}

export const SHORTS_DURATION = 40;