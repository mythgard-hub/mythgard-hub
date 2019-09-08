import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Autosuggest from 'react-autosuggest';
import CardSearchSelections from './card-search-selections.js';
import CardSearchSuggestion from './card-search-suggestion.js';

export const getSuggestions = (value, cards) => {
  const inputValue = value.trim().toLowerCase();
  const inputLength = inputValue.length;

  return inputLength === 0
    ? []
    : cards.filter(card => card.name.toLowerCase().indexOf(inputValue) > -1);
};

export default function CardSearch(props) {
  const { cards, value, onChangeValue, selections, onSelect } = props;
  const [suggestions, setSuggestions] = useState([]);

  const onSuggestionSelected = (e, { suggestion }) => {
    e && e.preventDefault();

    const newSelections = [...selections, suggestion];
    onSelect(newSelections);
    onChangeValue('');
  };

  const onSelectionDismiss = (e, c) => {
    e && e.preventDefault();

    const newSelections = selections.filter(card => c.id !== card.id);
    onSelect(newSelections);
  };

  const inputProps = {
    placeholder: 'Type a card name...',
    value,
    onChange: (_, { newValue }) => {
      onChangeValue(newValue);
    },
    className: 'card-search-input'
  };

  return (
    <div data-cy="cardSearch">
      <Autosuggest
        suggestions={suggestions}
        onSuggestionsFetchRequested={({ value }) =>
          setSuggestions(getSuggestions(value, cards))
        }
        onSuggestionsClearRequested={() => setSuggestions([])}
        onSuggestionSelected={onSuggestionSelected}
        getSuggestionValue={suggestion => suggestion.name}
        renderSuggestion={suggestion => (
          <CardSearchSuggestion suggestion={suggestion} />
        )}
        inputProps={inputProps}
        highlightFirstSuggestion={true}
      />
      <CardSearchSelections
        cards={selections}
        onDismissClick={onSelectionDismiss}
      ></CardSearchSelections>
    </div>
  );
}

CardSearch.propTypes = {
  value: PropTypes.string,
  selections: PropTypes.array,
  onChangeValue: PropTypes.func,
  cards: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number,
      name: PropTypes.string
    })
  ),
  onSelect: PropTypes.func
};

CardSearch.defaultProps = {
  cards: [],
  onSelect: () => {},
  onChangeValue: () => {}
};
