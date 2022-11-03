import './MoviesCardList.css';
import MoviesCard from '../MoviesCard/MoviesCard';

function MoviesCardList(props) {
  return (
    <ul className='movies-list'>
      <MoviesCard/>
      <MoviesCard/>
      <MoviesCard/>
    </ul>
  );
}

export default MoviesCardList;