import { useLocation } from 'react-router-dom';
import { ROUTE_PATHS } from '../../utils/RoutePaths';
import React from 'react';
import './MoviesCard.css';

function MoviesCard(p) {
  const location = useLocation();
  const isSaved = (location.pathname === ROUTE_PATHS.movies) ? p.savedMoviesCardsList.map((card) => card.movieId).some(movieId => movieId === p.movieCard.movieId) : false;
  const cardLikeButtonClassName = (`movie-card__save-btn ${isSaved ? 'movie-card__save-btn_active' : ''}`);

  function handleBtnClick() {
    if (location.pathname === ROUTE_PATHS.savedMovies) {
      p.onMovieDelete(p.movieCard);
    } else {
      if (isSaved) {
        p.onMovieDelete(p.movieCard);
      } else {
        p.onMovieSave(p.movieCard);
      }
    }
  }

  function duration(duration) {
    const hours = Math.trunc(duration / 60);
    const minutes = duration % 60;
    return `${hours}ч ${minutes}м`;
  }

  return (
    <li
      className='movie-card' >
      <h2
        className='movie-card__title'>
        <a
          target="_blank"
          rel='noreferrer'
          href={p.movieCard.trailerLink}
          className="movie-card__link">{p.movieCard.nameRU}</a>
      </h2>
      <p
        className='movie-card__duration'>
        {duration(p.movieCard.duration)}
      </p>
      <a
        target="_blank"
        rel='noreferrer'
        href={p.movieCard.trailerLink}
        className="movie-card__link">
        <img
          className='movie-card__image'
          alt={`Обложка фильма ${p.movieCard.name}`}
          src={p.movieCard.image} />
      </a>
      {(location.pathname === ROUTE_PATHS.movies) ?
        <button
          onClick={handleBtnClick}
          className={cardLikeButtonClassName}
          type="button" /> :
        <button
          onClick={handleBtnClick}
          className='movie-card__delete-btn'
          type="button" />}
    </li>
  );
}

export default MoviesCard;