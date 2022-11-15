import React from 'react';
import './SearchForm.css';
import { ROUTE_PATHS } from '../../utils/RoutePaths';
import FilterCheckbox from '../FilterCheckbox/FilterCheckbox';
import { useLocation } from 'react-router-dom';
import { useFormWithValidation } from '../useFormWithValidation';

function SearchForm(p) {
  const location = useLocation();
  const isSaved = location.pathname === ROUTE_PATHS.savedMovies ? true : false;
  const [isInvalidInput, setIsInvalidInput] = React.useState(false);
  const form = useFormWithValidation();
  const searchInputClassname = (`search-form__input search-form__input_${isInvalidInput ? 'error' : ''}`);
  const searchInputErrorClassname = (`search-form__input-error ${isInvalidInput ? 'search-form__input-error_visible' : ''}`);

  React.useEffect(() => {
    setIsInvalidInput(false);
  }, [form.values[`form-input-film-${isSaved ? 'saved' : 'all'}`]])

  function handleSubmit(e) {
    setIsInvalidInput(false);
    e.preventDefault();
    const filmInput = form.values[`form-input-film-${isSaved ? 'saved' : 'all'}`];
    const regex = /[a-z,а-я,0-9]/i;
    if (!regex.test(filmInput)) {
      setIsInvalidInput(true);
      return;
    }
    p.onSearch(filmInput, isSaved);
  }

  function onChangeCheckbox() {
    p.onChangeCheckbox();
  }

  return (
    <>
      <form
        onSubmit={handleSubmit}
        className='search-form'>
        <input
          onChange={form.handleChange}
          value={form.values[`form-input-film-${isSaved ? 'saved' : 'all'}`]}
          className={searchInputClassname}
          name={`form-input-film-${isSaved ? 'saved' : 'all'}`}
          id={`input-film-${isSaved ? 'saved' : 'all'}`}
          type='text'
          required
          placeholder='Фильм' />
        <button
          type='submit'
          className='search-form__search-btn'>
        </button>
        <p
          className='search-form__checkbox-description'>
          <FilterCheckbox
            onChange={onChangeCheckbox}
            isChecked={p.isShorts} />
          Короткометражки
        </p>
      </form>
      <span
        className={searchInputErrorClassname}>
        Введите ключевое слово для поиска
      </span>
    </>
  );
}

export default SearchForm;