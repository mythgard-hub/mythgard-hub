import PropTypes from 'prop-types';

export default function DeckSearchFormText(props) {
  const { label, value, name, cyName, onChange, placeholder } = props;

  return (
    <label>
      <style jsx>{`
        label {
          text-transform: uppercase;
          padding-right: 20px;
        }
        input {
          margin: 10px 0;
          width: 100%;
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
      />
    </label>
  );
}

DeckSearchFormText.propTypes = {
  label: PropTypes.string.isRequired,
  value: PropTypes.string,
  name: PropTypes.string.isRequired,
  cyName: PropTypes.string,
  onChange: PropTypes.func.isRequired,
  placeholder: PropTypes.string
};
