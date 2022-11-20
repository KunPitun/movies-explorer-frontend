import React from 'react';
import './Profile.css';
import Input from '../Input/Input';
import { CurrentUserContext } from '../../contexts/CurrentUserContext';
import { useFormWithValidation } from '../useFormWithValidation';

function Profile(p) {
  const currentUser = React.useContext(CurrentUserContext);
  const form = useFormWithValidation();

  function handleSubmit(e) {
    e.preventDefault();
    const name = form.values['form-input-name'];
    const email = form.values['form-input-email'];
    p.onUpdateUser(name, email);
    form.resetForm({ 'form-input-name': name, 'form-input-email': email });
  }

  return (
    <section
      onSubmit={handleSubmit}
      className='profile'>
      <h2
        className='profile__title'>
        {`Привет, ${currentUser.name}`}
      </h2>
      <form
        className='profile__form'>
        <Input
          isInputsDisabled={p.isFormBlocked}
          isProfile='true'
          onChange={form.handleChange}
          value={form.values['form-input-name']}
          type='name'
          description='Имя'
          error={form.errors['form-input-name']}
          minLength={2}
          maxLength={30} />
        <Input
          isInputsDisabled={p.isFormBlocked}
          isProfile='true'
          onChange={form.handleChange}
          value={form.values['form-input-email']}
          type='email'
          description='E-mail'
          error={form.errors['form-input-email']} />
        <button
          type='submit'
          className='profile__submit-btn'
          disabled={!form.isValid || p.isFormBlocked}>
          Редактировать
        </button>
      </form>
      <button
        onClick={p.onLogOut}
        className='profile__exit-btn'
        type='button'>
        Выйти из аккаунта
      </button>
    </section>
  );
}

export default Profile;