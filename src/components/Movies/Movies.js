import './Movies.css';
import SearchForm from '../SearchForm/SearchForm';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import React from 'react';
import {
  SCREEN_WIDTH,
  BASE_QUANTITY_OF_CARDS_FOR_SCREEN_WIDTH,
  QUANTITY_OF_CARDS_FOR_MORE_BTN_FOR_SCREEN_WIDTH
} from '../../utils/Constants';

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
    if (screenWidth >= SCREEN_WIDTH.big && p.moviesCardsList.length > BASE_QUANTITY_OF_CARDS_FOR_SCREEN_WIDTH.big) {
      setMoviesCardsList(p.moviesCardsList.slice(0, 12));
    }
    if (screenWidth < SCREEN_WIDTH.big && screenWidth >= SCREEN_WIDTH.middle && p.moviesCardsList.length > BASE_QUANTITY_OF_CARDS_FOR_SCREEN_WIDTH.middle) {
      setMoviesCardsList(p.moviesCardsList.slice(0, 8));
    }
    if (screenWidth < SCREEN_WIDTH.middle && screenWidth >= SCREEN_WIDTH.small && p.moviesCardsList.length > BASE_QUANTITY_OF_CARDS_FOR_SCREEN_WIDTH.small) {
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
    if (screenWidth >= SCREEN_WIDTH.big) {
      if ((moviesCardsList.length % 2) === 0 && (moviesCardsList.length % 4) !== 0) {
        setMoviesCardsList(p.moviesCardsList.slice(0, (moviesCardsList.length + QUANTITY_OF_CARDS_FOR_MORE_BTN_FOR_SCREEN_WIDTH.big.cardsListDivisibleOnlyByTwo)));
      } else {
        setMoviesCardsList(p.moviesCardsList.slice(0, (moviesCardsList.length + QUANTITY_OF_CARDS_FOR_MORE_BTN_FOR_SCREEN_WIDTH.big.cardsListDivisibleByFour)));
      }
      if ((moviesCardsList.length % 3) === 0) {
        setMoviesCardsList(p.moviesCardsList.slice(0, (moviesCardsList.length + QUANTITY_OF_CARDS_FOR_MORE_BTN_FOR_SCREEN_WIDTH.big.cardsListDivisibleByThree)));
      }
    } else {
      if ((moviesCardsList.length % 2) === 0) {
        setMoviesCardsList(p.moviesCardsList.slice(0, (moviesCardsList.length + QUANTITY_OF_CARDS_FOR_MORE_BTN_FOR_SCREEN_WIDTH.middleAndSmall.cardsListDivisibleByTwo)));
      } else {
        setMoviesCardsList(p.moviesCardsList.slice(0, (moviesCardsList.length + QUANTITY_OF_CARDS_FOR_MORE_BTN_FOR_SCREEN_WIDTH.middleAndSmall.cardsListNotDivisibleByTwo)));
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