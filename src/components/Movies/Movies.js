import './Movies.css';
import SearchForm from '../SearchForm/SearchForm';
import MoviesCardList from '../MoviesCardList/MoviesCardList';

function Movies() {
  function handleMoreBtnClick() {

  }

  return (
    <section className='movies'>
      <SearchForm />
      <MoviesCardList />
      <button onClick={handleMoreBtnClick} type='submit' className='movies__more-btn'>Ещё</button>
    </section>
  );
}

export default Movies;