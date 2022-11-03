import React from 'react';
import './Profile.css';
import Input from '../Input/Input';

function Profile(props) {
  const [email, setEmail] = React.useState('');
  const [emailError, setEmailError] = React.useState('');
  const [name, setName] = React.useState('');
  const [nameError, setNameError] = React.useState('');

  function handleChangeName(e) {
    setName(e.target.value);
  }

  function handleChangeEmail(e) {
    setEmail(e.target.value);
  }

  return (
    <section className='profile'>
      <h2 className='profile__title'>{`Привет, ${props.name}`}</h2>
      <form className='profile__form'>
        <Input isProfile='true' onChange={handleChangeName} value={name} type='name' description='Имя' isError={nameError}></Input>
        <Input isLast={true} isProfile='true' onChange={handleChangeEmail} value={email} type='email' description='E-mail' isError={emailError}></Input>
      </form>
      <button type='submit' className='profile__submit-btn'>Редактировать</button>
      <button onClick={props.onLogOut} className='profile__exit-btn'>Выйти из аккаунта</button>
    </section>
  );
}

export default Profile;