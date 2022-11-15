import './Movies.css';
import SearchForm from '../SearchForm/SearchForm';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import React from 'react';

function Movies(p) {
  const [moviesCardsList, setMoviesCardsList] = React.useState(p.moviesCardsList);
  const [screenWidth, setScreenWidth] = React.useState(window.screen.width);
  const [isShorts, setIsShorts] = React.useState(localStorage.getItem('allFilmsCheckbox') ? JSON.parse(localStorage.getItem('allFilmsCheckbox')) : true);
  var resizeTimeout;

  React.useEffect(() => {
    const isAllFilmsInput = localStorage.getItem('allFilmsInput') ? true : false;
    if (isAllFilmsInput) {
      p.onSearch(localStorage.getItem('allFilmsInput'), false);
    }
    window.addEventListener('resize', getInitialWidth);
    return () => {
      window.removeEventListener('resize', getInitialWidth);
    };
  }, []);

  React.useEffect(() => {
    setMoviesCardsList(p.moviesCardsList);
    if (screenWidth >= 1280 && p.moviesCardsList.length > 12) {
      setMoviesCardsList(p.moviesCardsList.slice(0, 12));
    }
    if (screenWidth < 1280 && screenWidth >= 768 && p.moviesCardsList.length > 8) {
      setMoviesCardsList(p.moviesCardsList.slice(0, 8));
    }
    if (screenWidth < 768 && screenWidth >= 320 && p.moviesCardsList.length > 5) {
      setMoviesCardsList(p.moviesCardsList.slice(0, 5));
    }
  }, [p.moviesCardsList]);

  function handleChangeCheckbox() {
    setIsShorts(!isShorts);
    localStorage.setItem('allFilmsCheckbox', JSON.stringify(!isShorts));
  }

  function getInitialWidth(e) {
    if (!resizeTimeout) {
      resizeTimeout = setTimeout(function () {
        resizeTimeout = null;
        setScreenWidth(e.target.innerWidth);
      }, 600);
    }
  }

  function handleMoreBtnClick() {
    if (screenWidth >= 1280) {
      if ((moviesCardsList.length % 2) === 0 && (moviesCardsList.length % 4) !== 0) {
        setMoviesCardsList(p.moviesCardsList.slice(0, (moviesCardsList.length + 4)));
      } else {
        setMoviesCardsList(p.moviesCardsList.slice(0, (moviesCardsList.length + 6)));
      }
      if ((moviesCardsList.length % 3) === 0) {
        setMoviesCardsList(p.moviesCardsList.slice(0, (moviesCardsList.length + 3)));
      }
    } else {
      if ((moviesCardsList.length % 2) === 0) {
        setMoviesCardsList(p.moviesCardsList.slice(0, (moviesCardsList.length + 2)));
      } else {
        setMoviesCardsList(p.moviesCardsList.slice(0, (moviesCardsList.length + 3)));
      }
    }
  }

  return (
    <section
      className='movies'>
      <SearchForm
        onChangeCheckbox={handleChangeCheckbox}
        isShorts={isShorts}
        onSearch={p.onSearch} />
      <MoviesCardList
        isShorts={isShorts}
        onMovieSave={p.onMovieSave}
        moviesCardsList={moviesCardsList}
        onMovieDelete={p.onMovieDelete}
        isSearchError={p.isSearchError}
        isPreloaderVisible={p.isPreloaderVisible}
        savedMoviesCardsList={p.savedMoviesCardsList}
        isApiError={p.isApiError} />
      {(!p.isApiError && !p.isSearchError && ((p.moviesCardsList.length - moviesCardsList.length) > 0)) &&
        <button
          onClick={handleMoreBtnClick}
          type='button'
          className='movies__more-btn'>
          Ещё
        </button>}
    </section>
  );
}

export default Movies;