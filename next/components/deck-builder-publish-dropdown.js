import PropTypes from 'prop-types';

export default function DeckBuilderPublishDropdown({
  title,
  value,
  options,
  onChange
}) {
  return (
    <div className="publish-dropdown-container">
      <style jsx>{`
        .publish-dropdown-container {
          padding-top: 10px;
        }
        .input-label select {
          width: 100%;
          margin: 10px 0;
        }
      `}</style>
      <label className="input-label">
        {title}
        <br />
        <select value={value} onChange={onChange}>
          {options.map(option => (
            <option key={option.label} value={option.label}>
              {option.label}
            </option>
          ))}
        </select>
      </label>
    </div>
  );
}

DeckBuilderPublishDropdown.propTypes = {
  title: PropTypes.string,
  value: PropTypes.string,
  options: PropTypes.array,
  onChange: PropTypes.func
};
