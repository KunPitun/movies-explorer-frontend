import React from 'react';
import './Register.css';
import Input from '../Input/Input';
import { Link } from 'react-router-dom';

function Register(props) {
  const [email, setEmail] = React.useState('');
  const [emailError, setEmailError] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [passwordError, setPasswordError] = React.useState('');
  const [name, setName] = React.useState('');
  const [nameError, setNameError] = React.useState('');

  function handleChangeEmail(e) {
    setEmail(e.target.value);
  }

  function handleChangePassword(e) {
    setPassword(e.target.value);
  }

  function handleChangeName(e) {
    setName(e.target.value);
  }

  return (
    <section className='register'>
      <form className='register__form' noValidate>
        <Input onChange={handleChangeName} value={name} type='name' description='Имя' isError={nameError}
          minLength={8} maxLength={40}></Input>
        <Input onChange={handleChangeEmail} value={email} type='email' description='E-mail' isError={emailError}></Input>
        <Input onChange={handleChangePassword} value={password} type='password' description='Пароль' isError={passwordError}
          minLength={8} maxLength={30}></Input>
      </form>
      <button type='submit' className='register__submit-btn'>Зарегистрироваться</button>
      <div className='register__container'>
        <p className="register__text">Уже зарегистрированы?</p>
        <Link to={props.routePaths.signIn} className="register__link">Войти</Link>
      </div>
    </section>
  );
}

export default Register;