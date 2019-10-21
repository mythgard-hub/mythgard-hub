import React, { useState } from 'react';
import FactionFilters from './faction-filters.js';
import PropTypes from 'prop-types';
import { handleInputChangeHooks } from '../lib/form-utils.js';
import CardSearch from './card-search';
import SearchFormText from './search-form-text';
import DeckSearchFormUpdated from './deck-search-form-updated';

const resetFilters = values => {
  return {
    name: '',
    cardValue: '',
    cardSelections: values.cardSelections,
    cardSuggestions: [],
    factionNames: values.factionNames,
    isOnlyFactions: values.isOnlyFactions,
    updatedTime: values.updatedTime,
    authorName: values.authorName
  };
};

export default function DeckSearchForm(props) {
  const { onSubmit, searchQuery, defaultQuery, allCards } = props;
  searchQuery.cardSelections = searchQuery.cardIds.map(id => {
    return allCards.cards.nodes.find(c => c.id === id);
  });
  const [filters, setFilters] = useState(resetFilters(searchQuery));

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
    setFilters(resetFilters(defaultQuery));
    onSubmit(defaultQuery);
  };

  let cardSearchElement = null;
  if (allCards && allCards.cards) {
    cardSearchElement = (
      <CardSearch
        suggestions={filters.cardSuggestions}
        onChangeSuggestions={cardSuggestions =>
          changeState('cardSuggestions', cardSuggestions)
        }
        value={filters.cardValue}
        onChangeValue={cardValue => changeState('cardValue', cardValue)}
        cards={allCards.cards.nodes}
        selections={filters.cardSelections}
        disabled={filters.cardSelections.length > 4}
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

        @media only screen and (max-width: 600px) {
          form {
            display: flex;
            flex-direction: column;
          }

          .filters-container {
            flex-direction: column;
          }

          .action-buttons {
            width: 35%;
            flex-direction: column;
            margin-bottom: 20px;
          }

          .action-buttons input {
            margin-bottom: 15px;
          }

          .action-buttons input,
          .action-buttons button {
            font-size: 20px;
          }
        }
      `}</style>
      <FactionFilters
        factions={filters.factionNames}
        onFactionClick={factionNames =>
          changeState('factionNames', factionNames)
        }
        onIsOnlyFactionClick={handleInputChangeHooks(() =>
          changeState('isOnlyFactions', !filters.isOnlyFactions)
        )}
        isOnlyFactionsSetter={newVal => changeState('isOnlyFactions', newVal)}
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
            onSubmit={handleSubmit}
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
            onSubmit={handleSubmit}
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

const queryProps = {
  name: PropTypes.string,
  cardIds: PropTypes.array,
  factionNames: PropTypes.array,
  isOnlyFactions: PropTypes.bool,
  updatedTime: PropTypes.string,
  authorName: PropTypes.string
};

DeckSearchForm.propTypes = {
  onSubmit: PropTypes.func,
  searchQuery: queryProps,
  defaultQuery: queryProps,
  allCards: PropTypes.shape({
    cards: PropTypes.array
  })
};
