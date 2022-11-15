import React from 'react';
import './Register.css';
import Input from '../Input/Input';
import { ROUTE_PATHS } from '../../utils/RoutePaths';
import { useFormWithValidation } from '../useFormWithValidation';
import { Link, useHistory } from 'react-router-dom';
import { MESSAGES } from '../../utils/Messages';

function Register(p) {
  const form = useFormWithValidation();
  const history = useHistory();
  const isLoggedIn = localStorage.getItem('loggedIn') ? JSON.parse(localStorage.getItem('loggedIn')) : false;

  React.useEffect(() => {
    if (isLoggedIn) {
      history.push(ROUTE_PATHS.main);
    }
  });

  function handleSubmit(e) {
    e.preventDefault();
    const name = form.values['form-input-name'];
    const email = form.values['form-input-email'];
    const password = form.values['form-input-password'];
    if (email !== password) {
      p.onRegister(name, email, password);
      form.resetForm({ 'form-input-password': '', 'form-input-email': '', 'form-input-name': '' });
    }
    else {
      p.isInfoTooltipOpen({ isOpen: true, message: MESSAGES.registerEmailMatchesPasswordErrorMessage });
    }
  }

  return (
    <section
      onSubmit={handleSubmit}
      className='register'>
      <form
        className='register__form' noValidate>
        <Input
          isInputsDisabled={p.isInputsDisabled}
          onChange={form.handleChange}
          value={form.values['form-input-name']}
          type='name' description='Имя'
          error={form.errors['form-input-name']}
          minLength={2}
          maxLength={30} />
        <Input
          isInputsDisabled={p.isInputsDisabled}
          onChange={form.handleChange}
          value={form.values['form-input-email']}
          type='email'
          description='E-mail'
          error={form.errors['form-input-email']} />
        <Input
          isInputsDisabled={p.isInputsDisabled}
          onChange={form.handleChange}
          value={form.values['form-input-password']}
          type='password'
          description='Пароль'
          error={form.errors['form-input-password']}
          minLength={8} />
        <button
          type='submit'
          className='register__submit-btn'
          disabled={!form.isValid}>
          Зарегистрироваться
        </button>
      </form>
      <div
        className='register__container'>
        <p
          className="register__text">
          Уже зарегистрированы?
        </p>
        <Link
          to={ROUTE_PATHS.signIn}
          className="register__link">
          Войти
        </Link>
      </div>
    </section>
  );
}

export default Register;