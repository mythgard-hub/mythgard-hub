import React, { useState } from 'react';
import FactionFilters from './faction-filters.js';
import PropTypes from 'prop-types';
import { handleInputChangeHooks } from '../lib/form-utils.js';
import CardSearch from './card-search';
import SearchFormText from './search-form-text';
import DeckSearchFormUpdated from './deck-search-form-updated';

const resetFilters = values => {
  return {
    name: values.name,
    cardValue: '',
    cardSelections: values.cardSelections,
    cardSuggestions: [],
    factionNames: values.factionNames,
    isOnlyFactions: values.isOnlyFactions,
    updatedTime: values.updatedTime,
    authorName: values.authorName,
    sortBy: values.sortBy
  };
};

const serializeCards = cardArray => cardArray.map(c => c.id);

const deserializeCards = (serializedCards, allCards) => {
  return serializedCards.reduce((acc, id) => {
    const cardMatch = allCards.find(c => c.id === id);
    if (cardMatch) {
      acc.push(cardMatch);
    }
    return acc;
  }, []);
};

export default function DeckSearchForm(props) {
  const {
    onSubmit,
    searchQuery,
    defaultQuery,
    allCards,
    onClearFilters
  } = props;
  searchQuery.cardSelections = deserializeCards(
    searchQuery.cardIds,
    allCards.cards.nodes
  );
  const [filters, setFilters] = useState(resetFilters(searchQuery));

  const changeState = (filterName, value) => {
    setFilters(prevFilters => ({
      ...prevFilters,
      [filterName]: value
    }));
  };

  const handleSubmit = e => {
    e && e.preventDefault();
    const serializedCards = serializeCards(filters.cardSelections);
    onSubmit({
      name: filters.name,
      cardIds: serializedCards,
      factionNames: filters.factionNames,
      isOnlyFactions: filters.isOnlyFactions,
      updatedTime: filters.updatedTime,
      authorName: filters.authorName,
      sortBy: filters.sortBy
    });
  };

  const handleClear = () => {
    setFilters(resetFilters({ ...defaultQuery, cardSelections: [] }));
    onClearFilters();
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
          float: right;
          display: flex;
          flex-direction: row;
          margin-top: 20px;
          height: 35px;
          align-items: center;
        }
        .action-buttons input {
          margin-right: 10px;
        }
        .action-buttons label {
          display: flex;
          margin: 0 0 0 10px;
          flex-wrap: nowrap;
          white-space: nowrap;
          align-items: center;
        }
        .action-buttons label select {
          margin-left: 10px;
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
        <label className="included-cards input-label">
          Sort by
          <select
            value={filters.sortBy}
            onChange={handleInputChangeHooks(sortBy =>
              changeState('sortBy', sortBy)
            )}
          >
            <option value="dateDesc">Newest First</option>
            <option value="dateAsc">Oldest First</option>
            <option value="essenceAsc">Cost: Low-High</option>
            <option value="essenceDesc">Cost: High-Low</option>
            <option value="nameAsc">Name: A-Z</option>
            <option value="nameDesc">Name: Z-A</option>
          </select>
        </label>
      </div>
    </form>
  );
}

const queryProps = PropTypes.shape({
  name: PropTypes.string,
  cardIds: PropTypes.array,
  factionNames: PropTypes.array,
  isOnlyFactions: PropTypes.bool,
  updatedTime: PropTypes.string,
  authorName: PropTypes.string
});

DeckSearchForm.propTypes = {
  onSubmit: PropTypes.func,
  searchQuery: queryProps,
  defaultQuery: queryProps,
  allCards: PropTypes.shape({
    cards: PropTypes.shape({
      nodes: PropTypes.array
    })
  }),
  onClearFilters: PropTypes.func
};
