import PropTypes from 'prop-types';
import { submitOnEnter } from '../lib/form-utils';

export default function SearchFormText(props) {
  const {
    label,
    value,
    name,
    cyName,
    onChange,
    onSubmit,
    placeholder,
    maxLength
  } = props;

  return (
    <label className="input-label searchFormText">
      <style jsx>{`
        input {
          margin: 10px 0;
          width: 100%;
        }
        label {
          display: block;
        }
      `}</style>
      {label}
      <br />
      <input
        placeholder={placeholder}
        type="text"
        value={value}
        name={name}
        data-cy={cyName}
        className={name}
        onChange={onChange}
        maxLength={maxLength}
        onKeyUp={e => submitOnEnter(e, onSubmit)}
      />
    </label>
  );
}

SearchFormText.propTypes = {
  label: PropTypes.string.isRequired,
  value: PropTypes.string,
  name: PropTypes.string.isRequired,
  cyName: PropTypes.string,
  onChange: PropTypes.func.isRequired,
  placeholder: PropTypes.string,
  maxLength: PropTypes.string,
  onSubmit: PropTypes.func
};
