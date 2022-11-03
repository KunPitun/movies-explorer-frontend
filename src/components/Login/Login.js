import React from 'react';
import './Login.css';
import Input from '../Input/Input';
import { Link } from 'react-router-dom';

function Login(props) {
  const [email, setEmail] = React.useState('');
  const [emailError, setEmailError] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [passwordError, setPasswordError] = React.useState('');

  function handleChangeEmail(e) {
    setEmail(e.target.value);
  }

  function handleChangePassword(e) {
    setPassword(e.target.value);
  }


  return (
    <section className='login'>
      <form className='login__form' noValidate>
        <Input onChange={handleChangeEmail} value={email} type='email' description='E-mail' isError={emailError}></Input>
        <Input onChange={handleChangePassword} value={password} type='password' description='Пароль' isError={passwordError}
          minLength={8} maxLength={30}></Input>
      </form>
      <button type='submit' className='login__submit-btn'>Войти</button>
      <div className='login__container'>
        <p className="login__text">Ещё не зарегистрированы?</p>
        <Link to={props.routePaths.signUp} className="login__link">Регистрация</Link>
      </div>
    </section>
  );
}

export default Login;