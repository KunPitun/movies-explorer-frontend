import React from 'react';
import './Login.css';
import Input from '../Input/Input';
import { ROUTE_PATH } from '../../utils/Constants';
import { useFormWithValidation } from '../useFormWithValidation';
import { Link, useHistory } from 'react-router-dom';

function Login(p) {
  const form = useFormWithValidation();
  const history = useHistory();
  const isLoggedIn = localStorage.getItem('loggedIn') ? JSON.parse(localStorage.getItem('loggedIn')) : false;

  React.useEffect(() => {
    if (isLoggedIn) {
      history.push(ROUTE_PATH.main);
    }
  });

  function handleSubmit(e) {
    e.preventDefault();
    const email = form.values['form-input-email'];
    const password = form.values['form-input-password'];
    if (!email || !password) {
      return;
    }
    p.onLogin(email, password);
    form.resetForm({ 'form-input-password': password, 'form-input-email': email });
  }

  return (
    <section
      className='login'>
      <form
        onSubmit={handleSubmit}
        className='login__form' noValidate>
        <Input
          isInputsDisabled={p.isFormBlocked}
          onChange={form.handleChange}
          value={form.values['form-input-email']}
          type='email'
          description='E-mail'
          error={form.errors['form-input-email']}>
        </Input>
        <Input
          isInputsDisabled={p.isFormBlocked}
          onChange={form.handleChange}
          value={form.values['form-input-password']}
          type='password'
          description='Пароль'
          error={form.errors['form-input-password']}
          minLength={8}>
        </Input>
        <button
          type='submit'
          className='login__submit-btn'
          disabled={!form.isValid || p.isFormBlocked}>
          Войти
        </button>
      </form>
      <div
        className='login__container'>
        <p
          className="login__text">
          Ещё не зарегистрированы?
        </p>
        <Link
          to={ROUTE_PATH.signUp}
          className="login__link">
          Регистрация
        </Link>
      </div>
    </section>
  );
}

export default Login;