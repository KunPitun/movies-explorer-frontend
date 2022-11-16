import './MoviesCardList.css';
import { ROUTE_PATHS } from '../../utils/RoutePaths';
import MoviesCard from '../MoviesCard/MoviesCard';
import { useLocation } from 'react-router-dom';
import Preloader from '../Preloader/Preloader';
import React from 'react';

function MoviesCardList(p) {
  const location = useLocation();

  const cardsList = p.moviesCardsList.filter((card) => {
    if (!p.isShorts) {
      return card.duration >= 40;
    } else {
      return card;
    }
  }).map((card, i) =>
  (<MoviesCard
    onMovieSave={p.onMovieSave}
    onMovieDelete={p.onMovieDelete}
    movieCard={card}
    key={location.pathname === ROUTE_PATHS.savedMovies ? card._id : card.movieId}
    savedMoviesCardsList={p.savedMoviesCardsList} />)
  );

  const isNoSavedMovies = (p.savedMoviesCardsList.length === 0 && location.pathname === ROUTE_PATHS.savedMovies) ? true : false;
  const isAllMoviesInput = (localStorage.getItem('allFilmsInput') || location.pathname === ROUTE_PATHS.savedMovies) ? true : false;

  return (
    <ul
      className='movies-list'>
      {p.isPreloaderVisible ? <Preloader /> : ((cardsList.length !== 0 && !p.isApiError && !p.isSearchError) && cardsList)}
      {(!p.isPreloaderVisible && cardsList.length === 0 && !p.isApiError && !isNoSavedMovies && isAllMoviesInput) &&
        <h2
          className='movies-list__error-title'>
          Ничего не найдено
        </h2>}
      {(!p.isPreloaderVisible && isNoSavedMovies && !p.isApiError ) &&
        <h2
          className='movies-list__error-title'>
          У Вас нет сохранённых фильмов
        </h2>}
      {(!p.isPreloaderVisible && p.isApiError) &&
        <h2
          className='movies-list__error-title'>
          Во время запроса произошла ошибка. Возможно, проблема с соединением или сервер недоступен. Подождите немного и попробуйте ещё раз
        </h2>}
    </ul>
  );
}

export default MoviesCardList;