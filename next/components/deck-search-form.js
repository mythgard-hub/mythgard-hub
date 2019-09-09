import React, { useState } from 'react';
import { useQuery } from 'react-apollo-hooks';
import ErrorMessage from './error-message';
import FactionFilters from './faction-filters.js';
import PropTypes from 'prop-types';
import { handleInputChangeHooks } from '../lib/form-utils.js';
import CardSearch from './card-search';
import allCardsQuery from '../lib/queries/all-cards-query';
import SearchFormText from './search-form-text';
import DeckSearchFormUpdated from './deck-search-form-updated';

const resetFilters = () => {
  return {
    name: '',
    cardValue: '',
    cardSelections: [],
    cardSuggestions: [],
    factionNames: [],
    isOnlyFactions: true,
    updatedTime: '150',
    authorName: ''
  };
};

export default function DeckSearchForm(props) {
  const { onSubmit } = props;
  const [filters, setFilters] = useState(resetFilters());

  const changeState = (filterName, value) => {
    setFilters(prevFilters => ({
      ...prevFilters,
      [filterName]: value
    }));
  };

  const handleSubmit = e => {
    e && e.preventDefault();
    onSubmit({
      name: filters.name,
      cardIds: filters.cardSelections.map(c => c.id),
      factionNames: filters.factionNames,
      isOnlyFactions: filters.isOnlyFactions,
      updatedTime: filters.updatedTime,
      authorName: filters.authorName
    });
  };

  const handleClear = () => {
    setFilters(resetFilters());
    onSubmit({});
  };

  const { error, data } = useQuery(allCardsQuery);

  let cardSearchElement = null;
  if (error) cardSearchElement = <ErrorMessage message={error.message} />;
  if (data && data.cards) {
    cardSearchElement = (
      <CardSearch
        suggestions={filters.cardSuggestions}
        onChangeSuggestions={cardSuggestions =>
          changeState('cardSuggestions', cardSuggestions)
        }
        value={filters.cardValue}
        onChangeValue={cardValue => changeState('cardValue', cardValue)}
        cards={data.cards.nodes}
        selections={filters.cardSelections}
        onSelect={cardSelections =>
          changeState('cardSelections', cardSelections)
        }
      />
    );
  }

  return (
    <form>
      <style jsx>{`
        .filters-container {
          display: flex;
        }
        .filter-column {
          flex-grow: 1;
          display: flex;
          flex-direction: column;
        }
        .included-cards :global(.card-search-input) {
          margin: 10px 0;
          width: 100%;
        }
        .action-buttons {
          width: 25%;
          float: right;
          display: flex;
          flex-direction: row;
          margin-top: 20px;
        }
        .action-buttons input {
          margin-right: 10px;
        }
      `}</style>
      <FactionFilters
        onFactionClick={factionNames =>
          changeState('factionNames', factionNames)
        }
        onIsOnlyFactionClick={handleInputChangeHooks(isOnlyFactions =>
          changeState('isOnlyFactions', isOnlyFactions)
        )}
        isOnlyFactions={filters.isOnlyFactions}
      />
      <div className="filters-container">
        <div className="filter-column">
          <SearchFormText
            label="Deck Name"
            placeholder="Name..."
            value={filters.name}
            name="name"
            cyName="deckSearchDeckName"
            onChange={handleInputChangeHooks(name => changeState('name', name))}
          />
          <SearchFormText
            label="Creator"
            placeholder="Name of creator..."
            value={filters.authorName}
            name="authorName"
            cyName="deckSearchDeckAuthor"
            onChange={handleInputChangeHooks(authorName =>
              changeState('authorName', authorName)
            )}
          />
        </div>
        <div className="filter-column">
          <DeckSearchFormUpdated
            value={filters.updatedTime}
            onChange={handleInputChangeHooks(updatedTime =>
              changeState('updatedTime', updatedTime)
            )}
            name="updatedTime"
            cyName="deckSearchUpdatedTime"
          />
          <label className="included-cards input-label">
            Includes cards
            {cardSearchElement}
          </label>
        </div>
      </div>
      <div className="action-buttons">
        <input
          data-cy="deckSearchSubmit"
          type="submit"
          value="Apply"
          onClick={handleSubmit}
        />
        <button type="button" onClick={handleClear} data-cy="deckSearchClear">
          Clear
        </button>
      </div>
    </form>
  );
}

DeckSearchForm.propTypes = {
  onSubmit: PropTypes.func
};
