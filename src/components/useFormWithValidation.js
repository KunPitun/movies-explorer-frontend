import React, { useCallback } from 'react';
import { useLocation } from 'react-router-dom';
import { MESSAGES } from '../utils/Messages';

export function useFormWithValidation() {
  const location = useLocation();
  const [values, setValues] = React.useState({
    'form-input-password': '',
    'form-input-email': (localStorage.getItem('currentUser') && location.pathname === '/profile') ? JSON.parse(localStorage.getItem('currentUser')).email : '',
    'form-input-name': (localStorage.getItem('currentUser') && location.pathname === '/profile') ? JSON.parse(localStorage.getItem('currentUser')).name : '',
    'form-input-film-saved': localStorage.getItem('savedFilmsInput') ? localStorage.getItem('savedFilmsInput') : '',
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
    if (name === 'form-input-name') {
      const regex = /[^a-z,а-я -]/i;
      if (value.trim().length === 0) {
        validationMessage = MESSAGES.nameValidationMissedInputErrorMessage;
        handleSetData(name, value, validationMessage, false);
        return;
      }
      if (regex.test(value)) {
        validationMessage = MESSAGES.nameValidationErrorMessage;
        handleSetData(name, value, validationMessage, false);
        return;
      }
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