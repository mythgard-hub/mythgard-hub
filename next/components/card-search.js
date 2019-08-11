import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Autosuggest from 'react-autosuggest';
import CardList from './card-list.js';

const getSuggestions = (value, cards) => {
  const inputValue = value.trim().toLowerCase();
  const inputLength = inputValue.length;

  return inputLength === 0
    ? []
    : cards.filter(card => card.name.toLowerCase().indexOf(inputValue) > -1);
};

const getSuggestionValue = suggestion => suggestion.name;

const renderSuggestion = suggestion => <div>{suggestion.name}</div>;

class CardSearch extends Component {
  constructor(props) {
    super(props);
    this.onChange = this.onChange.bind(this);
    this.onSuggestionsFetchRequested = this.onSuggestionsFetchRequested.bind(
      this
    );
    this.onSuggestionsClearRequested = this.onSuggestionsClearRequested.bind(
      this
    );
    this.onSuggestionSelected = this.onSuggestionSelected.bind(this);
    this.onCardClick = this.onCardClick.bind(this);
    this.state = {
      value: '',
      suggestions: [],
      selections: []
    };
  }

  onChange = (event, { newValue }) => {
    this.setState({
      value: newValue
    });
  };

  onSuggestionsFetchRequested = ({ value }) => {
    this.setState({
      suggestions: getSuggestions(value, this.props.cards)
    });
  };

  onSuggestionsClearRequested = () => {
    this.setState({
      suggestions: []
    });
  };

  onSuggestionSelected = (e, { suggestion }) => {
    e && e.preventDefault();
    const newSelections = [...this.state.selections, suggestion];
    this.setState(
      {
        selections: newSelections,
        value: ''
      },
      () => {
        this.props.onSelect(this.state.selections.map(card => card.id));
      }
    );
  };

  onCardClick = (e, c) => {
    e && e.preventDefault();
    const newSelections = this.state.selections.filter(card => {
      return c.id !== card.id;
    });
    this.setState(
      {
        selections: newSelections
      },
      () => {
        this.props.onSelect(this.state.selections.map(card => card.id));
      }
    );
  };

  render() {
    const { value, suggestions } = this.state;

    const inputProps = {
      placeholder: 'Type a card name',
      value,
      onChange: this.onChange
    };
    return (
      <div data-cy="cardSearch">
        <Autosuggest
          suggestions={suggestions}
          onSuggestionsFetchRequested={this.onSuggestionsFetchRequested}
          onSuggestionsClearRequested={this.onSuggestionsClearRequested}
          onSuggestionSelected={this.onSuggestionSelected}
          getSuggestionValue={getSuggestionValue}
          renderSuggestion={renderSuggestion}
          inputProps={inputProps}
          highlightFirstSuggestion={true}
        />
        <CardList
          cards={this.state.selections}
          onCardClick={this.onCardClick}
        ></CardList>
      </div>
    );
  }
}

CardSearch.propTypes = {
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
  onSelect: () => true
};

export default CardSearch;
