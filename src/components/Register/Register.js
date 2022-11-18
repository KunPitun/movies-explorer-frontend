import React from 'react';
import './Register.css';
import Input from '../Input/Input';
import { ROUTE_PATH, MESSAGE } from '../../utils/Constants';
import { useFormWithValidation } from '../useFormWithValidation';
import { Link, useHistory } from 'react-router-dom';

function Register(p) {
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
    const name = form.values['form-input-name'];
    const email = form.values['form-input-email'];
    const password = form.values['form-input-password'];
    if (email !== password) {
      p.onRegister(name, email, password);
      form.resetForm({ 'form-input-password': password, 'form-input-email': email, 'form-input-name': name });
    }
    else {
      p.isInfoTooltipOpen({ isOpen: true, message: MESSAGE.registerEmailMatchesPasswordError });
    }
  }

  return (
    <section
      onSubmit={handleSubmit}
      className='register'>
      <form
        className='register__form' noValidate>
        <Input
          isInputsDisabled={p.isFormBlocked}
          onChange={form.handleChange}
          value={form.values['form-input-name']}
          type='name' description='Имя'
          error={form.errors['form-input-name']}
          minLength={2}
          maxLength={30} />
        <Input
          isInputsDisabled={p.isFormBlocked}
          onChange={form.handleChange}
          value={form.values['form-input-email']}
          type='email'
          description='E-mail'
          error={form.errors['form-input-email']} />
        <Input
          isInputsDisabled={p.isFormBlocked}
          onChange={form.handleChange}
          value={form.values['form-input-password']}
          type='password'
          description='Пароль'
          error={form.errors['form-input-password']}
          minLength={8} />
        <button
          type='submit'
          className='register__submit-btn'
          disabled={!form.isValid || p.isFormBlocked}>
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
          to={ROUTE_PATH.signIn}
          className="register__link">
          Войти
        </Link>
      </div>
    </section>
  );
}

export default Register;