import './MoviesCardList.css';
import { ROUTE_PATHS } from '../../utils/RoutePaths';
import MoviesCard from '../MoviesCard/MoviesCard';
import { useLocation } from 'react-router-dom';
import Preloader from '../Preloader/Preloader';

function MoviesCardList(p) {
  const location = useLocation();
  const cardsList = p.moviesCardsList.map((card, i) => {
    const cardItem = (<MoviesCard
      onMovieSave={p.onMovieSave}
      onMovieDelete={p.onMovieDelete}
      movieCard={card}
      key={location.pathname === ROUTE_PATHS.savedMovies ? card._id : card.movieId}
      savedMoviesCardsList={p.savedMoviesCardsList} />);
    if (!p.isShorts) {
      if (card.duration > 40) {
        return cardItem;
      } else {
        return null;
      }
    } else {
      return cardItem;
    }
  });

  return (
    <ul
      className='movies-list'>
      {p.isPreloaderVisible ? <Preloader /> : ((cardsList.filter((card) => card !== null).length === 0 && p.savedMoviesCardsList.length > 0) ?
        <h2
          className='movies-list__error-title'>
          Ничего не найдено
        </h2> : (p.isApiError ?
          <h2
            className='movies-list__error-title'>
            Во время запроса произошла ошибка. Возможно, проблема с соединением или сервер недоступен. Подождите немного и попробуйте ещё раз
          </h2> : ((p.savedMoviesCardsList.length === 0 && location.pathname === ROUTE_PATHS.savedMovies) ?
            <h2
              className='movies-list__error-title'>
              У Вас нет сохранённых фильмов
            </h2> : cardsList
          )
        )
      )}
    </ul>
  );
}

export default MoviesCardList;