import React, { useCallback } from 'react';
import { useLocation } from 'react-router-dom';
import { MESSAGE } from '../utils/Constants';

export function useFormWithValidation() {
  const location = useLocation();

  const currentUserEmail = (localStorage.getItem('currentUser') && location.pathname === '/profile') && JSON.parse(localStorage.getItem('currentUser')).email;
  const currentUserName = (localStorage.getItem('currentUser') && location.pathname === '/profile') && JSON.parse(localStorage.getItem('currentUser')).name ;

  const [values, setValues] = React.useState({
    'form-input-password': '',
    'form-input-email': currentUserEmail ? currentUserEmail : '',
    'form-input-name': currentUserName ? currentUserName : '',
    'form-input-film-saved': '',
    'form-input-film-all': localStorage.getItem('allFilmsInput') ? localStorage.getItem('allFilmsInput') : '',
  });

  const [errors, setErrors] = React.useState({});
  const [isValid, setIsValid] = React.useState(false);

  function handleSetData(name, value, validationMessage, isValid) {
    setValues({ ...values, [name]: value });
    setErrors({ ...errors, [name]: validationMessage });
    setIsValid(isValid);
  }

  const handleChange = (e) => {
    const target = e.target;
    const name = target.name;
    const value = target.value
    let validationMessage = target.validationMessage;
    const allInputs = Array.from(target.closest('form').querySelectorAll('input'));

    if (name === 'form-input-name') {
      const regex = /[^a-z,а-я -]/i;
      if (value.trim().length === 0) {
        validationMessage = MESSAGE.nameValidationMissedInputError;
        handleSetData(name, value, validationMessage, false);
        return;
      }
      if (regex.test(value)) {
        validationMessage = MESSAGE.nameValidationInvalidCharacterError;
        handleSetData(name, value, validationMessage, false);
        return;
      }
    }
    if (allInputs[0].value === currentUserName && allInputs[1].value === currentUserEmail) {
      handleSetData(name, value, validationMessage, false);
        return;
    }
    handleSetData(name, value, validationMessage, target.closest("form").checkValidity());
  };

  const resetForm = useCallback(
    (newValues = {}, newErrors = {}, newIsValid = false) => {
      setValues(newValues);
      setErrors(newErrors);
      setIsValid(newIsValid);
    },
    [setValues, setErrors, setIsValid]
  );

  return { values, handleChange, errors, isValid, resetForm };
}