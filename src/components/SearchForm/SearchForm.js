import React from 'react';
import './SearchForm.css';
import FilterCheckbox from '../FilterCheckbox/FilterCheckbox';

function SearchForm() {
  const [film, setFilm] = React.useState('');
  const [isChecked, setIsChecked] = React.useState(true);

  const onChangeCheckbox = () => {
    setIsChecked(!isChecked);
  };

  function onChangeFilm(e) {
    setFilm(e.target.value);
  }

  function onSearchBtnClick() {

  }

  return (
    <form className='search-form'>
      <input onChange={onChangeFilm} value={film} className='search-form__input' name='input-film'
        id='input-film' type='text' required placeholder='Фильм'/>
      <button onClick={onSearchBtnClick} type='submit' className='search-form__search-btn'></button>
      <p className='search-form__checkbox-description'>
        <FilterCheckbox onChange={onChangeCheckbox} isChecked={isChecked}/>
        Короткометражки
      </p>
    </form>
  );
}

export default SearchForm;