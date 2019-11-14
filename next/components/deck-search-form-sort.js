import PropTypes from 'prop-types';

export default function DeckSearchFormSort(props) {
  const { value, name, cyName, onChange } = props;

  return (
    <label className="input-label deck-search-form-sort">
      <style jsx>{`
        select {
          margin-left: 10px;
        }
      `}</style>
      Sort by:
      <select data-cy={cyName} name={name} value={value} onChange={onChange}>
        <option value="dateDesc">Newest First</option>
        <option value="dateAsc">Oldest First</option>
        <option value="essenceAsc">Cost: Low-High</option>
        <option value="essenceDesc">Cost: High-Low</option>
        <option value="nameAsc">Name: A-Z</option>
        <option value="nameDesc">Name: Z-A</option>
        <option value="ratingDesc">Rating: High-Low</option>
        <option value="ratingAsc">Rating: Low-High</option>
      </select>
    </label>
  );
}

DeckSearchFormSort.propTypes = {
  value: PropTypes.string,
  name: PropTypes.string.isRequired,
  cyName: PropTypes.string,
  onChange: PropTypes.func.isRequired
};
