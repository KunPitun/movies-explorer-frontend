import './Input.css';

function Input(props) {
  return (
    <div className='input'>
      <p className={`input__description input__description_type_${props.isProfile && 'profile'}`}>{props.description}</p>
      <input onChange={props.onChange} value={props.value} className={`input__input input__input_type_${props.type}
      input__input_type_${props.isProfile && 'profile'} input__input_type_${props.isLast && 'last'}`} name={`input-${props.type}`}
        id={`input-${props.type}`} required minLength={props.minLength} type={(props.type !== 'password' || props.type !== 'email') && 'text'}
        maxLength={props.maxLength}></input>
      <span className={`input__error input__error_type_${props.type} input__error${props.isError && '_visible'}`}></span>
    </div>
  );
}

export default Input;