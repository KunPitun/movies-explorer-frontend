import './SavedMovies.css';
import SearchForm from '../SearchForm/SearchForm';
import MoviesCardList from '../MoviesCardList/MoviesCardList';

function Movies() {
  function handleMoreBtnClick() {

  }

  return (
    <section className='saved-movies'>
      <SearchForm />
      <MoviesCardList />
    </section>
  );
}

export default Movies;