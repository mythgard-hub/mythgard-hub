import React, { useState } from 'react';
import { useQuery } from 'react-apollo-hooks';
import ErrorMessage from './error-message';
import FactionFilters from './faction-filters.js';
import PropTypes from 'prop-types';
import { handleInputChangeHooks } from '../lib/form-utils.js';
import CardSearch from './card-search';
import allCardsQuery from '../lib/queries/all-cards-query';
import DeckSearchFormText from './deck-search-form-text';
import DeckSearchFormUpdated from './deck-search-form-updated';

export default function DeckSearchForm(props) {
  const { onSubmit } = props;
  const [name, setName] = useState('');
  const [cardIds, setCardIds] = useState([]);
  const [factionNames, setFactionNames] = useState([]);
  const [isOnlyFactions, setIsOnlyFactions] = useState(true);
  const [updatedTime, setUpdatedTime] = useState('150');
  const [authorName, setAuthorName] = useState('');

  const handleSubmit = e => {
    e && e.preventDefault();
    onSubmit({
      name,
      cardIds,
      factionNames,
      isOnlyFactions,
      updatedTime,
      authorName
    });
  };

  const { error, data } = useQuery(allCardsQuery);

  let cardSearchElement = null;
  if (error) cardSearchElement = <ErrorMessage message={error} />;
  if (data) {
    cardSearchElement = (
      <CardSearch
        cards={data.cards.nodes}
        onSelect={selectedCardIds => setCardIds(selectedCardIds)}
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
        label {
          text-transform: uppercase;
          padding-right: 20px;
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
        onFactionClick={factionNames => setFactionNames(factionNames)}
        onIsOnlyFactionClick={handleInputChangeHooks(setIsOnlyFactions)}
        isOnlyFactions={isOnlyFactions}
      />
      <div className="filters-container">
        <div className="filter-column">
          <DeckSearchFormText
            label="Deck Name"
            placeholder="Name..."
            value={name}
            name="name"
            cyName="deckSearchDeckName"
            onChange={handleInputChangeHooks(setName)}
          />
          <DeckSearchFormText
            label="Creator"
            placeholder="Name of creator..."
            value={authorName}
            name="authorName"
            cyName="deckSearchDeckAuthor"
            onChange={handleInputChangeHooks(setAuthorName)}
          />
        </div>
        <div className="filter-column">
          <label className="included-cards">
            Includes cards
            {cardSearchElement}
          </label>
          <DeckSearchFormUpdated
            value={updatedTime}
            onChange={handleInputChangeHooks(setUpdatedTime)}
            name="updatedTime"
            cyName="deckSearchUpdatedTime"
          />
        </div>
      </div>
      <div className="action-buttons">
        <input
          data-cy="deckSearchSubmit"
          type="submit"
          value="Apply"
          onClick={handleSubmit}
        />
        <button>Clear</button>
      </div>
    </form>
  );
}

DeckSearchForm.propTypes = {
  onSubmit: PropTypes.func
};
