import React from 'react';
import PropTypes from 'prop-types';

export default function CardSearchFiltersSetOption(props) {
  const { optionName, optionValue = optionName, cardset, setCardSet } = props;

  return (
    <label className="card-set-filter-option">
      <style jsx>{`
        .card-set-filter-option {
          cursor: pointer;
        }

        input {
          margin: 0 10px 15px 0;
        }
      `}</style>
      <input
        data-cy="cardSetOption"
        type="radio"
        name="cardset"
        value={optionValue}
        checked={cardset === optionValue}
        onChange={() => setCardSet(optionValue)}
      />
      {optionName}
    </label>
  );
}

CardSearchFiltersSetOption.propTypes = {
  optionName: PropTypes.string,
  cardset: PropTypes.string,
  setCardSet: PropTypes.func
};
