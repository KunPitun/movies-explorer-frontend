import { useLocation } from 'react-router-dom';
import React from 'react';
import './MoviesCard.css';
import testFilmImage from '../../images/author-avatar.jpg';

function MoviesCard(props) {
  const location = useLocation();
  const [isSaved, setIsSaved] = React.useState(false);
  const cardLikeButtonClassName = (
    `movie-card__save-btn ${isSaved ? 'movie-card__save-btn_active' : ''}`
  );

  function handleSaveClick() {
    setIsSaved(!isSaved);
  }

  function handleDeleteClick() {
  
  }

  return (
    <li className='movie-card'>
      <h2 className='movie-card__title'>Pepe</h2>
      <p className='movie-card__duration'>9ч 9м</p>
      <img className='movie-card__image' alt={`Обложка фильма ${'pepe'}`} src={testFilmImage}></img>
      {(location.pathname === '/movies') && <button onClick={handleSaveClick} className={cardLikeButtonClassName} type="button"></button>}
      {(location.pathname === '/saved-movies') && <button onClick={handleDeleteClick} className='movie-card__delete-btn' type="button"></button>}     
    </li>
  );
}

export default MoviesCard;