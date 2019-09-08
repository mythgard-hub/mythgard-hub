import PropTypes from 'prop-types';

export default function DeckSearchFormUpdated(props) {
  const { value, name, cyName, onChange } = props;

  return (
    <label className="input-label">
      <style jsx>{`
        select {
          margin: 10px 0;
          width: 100%;
        }
      `}</style>
      Updated
      <br />
      <select data-cy={cyName} name={name} value={value} onChange={onChange}>
        <option value="100000">Beginning of time</option>
        <option value="15">Last 15 days</option>
        <option value="30">Last 30 days</option>
        <option value="45">Last 45 days</option>
        <option value="60">Last 60 days</option>
        <option value="75">Last 75 days</option>
        <option value="90">Last 90 days</option>
        <option value="150">Last 150 days</option>
      </select>
    </label>
  );
}

DeckSearchFormUpdated.propTypes = {
  value: PropTypes.string,
  name: PropTypes.string.isRequired,
  cyName: PropTypes.string,
  onChange: PropTypes.func.isRequired
};
