import './FilterCheckbox.css';

function FilterCheckbox(props) {
  return (
    <label className="checkbox">
      <input type="checkbox" onChange={props.onChange} checked={props.isChecked} />
      <span className="checkbox__switch"></span>
    </label>
  );
}

export default FilterCheckbox;