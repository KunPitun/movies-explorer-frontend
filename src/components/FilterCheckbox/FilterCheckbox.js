import './FilterCheckbox.css';

function FilterCheckbox(p) {
  return (
    <label
      className="checkbox">
      <input
        type="checkbox"
        onChange={p.onChange}
        checked={p.isChecked} />
      <span
        className="checkbox__switch">
      </span>
    </label>
  );
}

export default FilterCheckbox;