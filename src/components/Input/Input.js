import './Input.css';

function Input(p) {
  const inputDescriptionClassname = (`input__description ${p.isProfile ? 'input__description_type_profile' : ''}`);
  const inputClassName = (`input__input input__input_type_${p.type} ${p.isProfile ? 'input__input_type_profile' : ''} ${(p.isProfile && p.type === 'email') ? 'input__input_type_profile-email' : ''}`);
  const inputErrorClassname = (`input__error ${p.isProfile ? 'input__error_type_profile' : ''} input__error_type_${p.type} ${p.error ? 'input__error_visible' : ''}`);

  return (
    <div
      className='input'>
      <p
        className={inputDescriptionClassname}>
        {p.description}
      </p>
      <input
        disabled={p.isInputsDisabled}
        onChange={p.onChange}
        value={p.value}
        className={inputClassName}
        name={`form-input-${p.type}`}
        id={`input-${p.type}`}
        required
        minLength={p.minLength}
        type={(p.type === 'password') ? 'password' : ((p.type === 'email') ? 'email' : 'text')}
        maxLength={p.maxLength}>
      </input>
      <span
        className={inputErrorClassname}>
        {p.error}
      </span>
    </div>
  );
}

export default Input;