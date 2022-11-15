import './SavedMovies.css';
import SearchForm from '../SearchForm/SearchForm';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import React from 'react';

function SavedMovies(p) {
  const [isShorts, setIsShorts] = React.useState(localStorage.getItem('savedFilmsCheckbox') ? JSON.parse(localStorage.getItem('savedFilmsCheckbox')) : true);

  React.useEffect(() => {
    const isSavedFilmsInput = localStorage.getItem('savedFilmsInput') ? true : false;
    if (isSavedFilmsInput) {
      p.onSearch(localStorage.getItem('savedFilmsInput'), true);
    }
  }, [p.savedMoviesCardsList]);

  function handleChangeCheckbox() {
    setIsShorts(!isShorts);
    localStorage.setItem('savedFilmsCheckbox', JSON.stringify(!isShorts));
  }

  return (
    <section
      className='saved-movies'>
      <SearchForm
        onChangeCheckbox={handleChangeCheckbox}
        isShorts={isShorts}
        onSearch={p.onSearch} />
      <MoviesCardList
        isShorts={isShorts}
        moviesCardsList={p.findedSavedMoviesCardsList}
        onMovieDelete={p.onMovieDelete}
        isSearchError={p.isSearchError}
        isPreloaderVisible={p.isPreloaderVisible}
        savedMoviesCardsList={p.savedMoviesCardsList}
        isApiError={p.isApiError} />
    </section>
  );
}

export default SavedMovies;