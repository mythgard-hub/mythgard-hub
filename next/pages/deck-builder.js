import React, { useState } from 'react';
import SomeCards from '../components/some-cards';
import AllPaths from '../components/all-paths';
import AllPowers from '../components/all-powers.js';
import Layout from '../components/layout';
import ImportedDeckErrors from '../components/imported-deck-errors';
import { initializeDeckBuilder, addCardToDeck } from '../lib/deck-utils';
import DeckBuilderSearchForm from '../components/deck-builder-search-form.js';
import PageBanner from '../components/page-banner';
import FactionFilters from '../components/faction-filters';
import RarityFilter from '../components/rarity-filter.js';
import ManaCostFilter from '../components/mana-cost-filter.js';
import SupertypeFilter from '../components/supertype-filter.js';
import TabGroup from '../components/tab-group.js';
import DeckBuilderSidebar from '../components/deck-builder-sidebar';

function DeckBuilderPage() {
  const [cardSearchText, setCardSearchText] = useState('');
  const [cardRarities, setCardRarities] = useState([]);
  const [cardManaCosts, setCardManaCosts] = useState([]);
  const [supertypes, setSupertypes] = useState([]);
  const [factions, setFactions] = useState([]);
  const [currentTab, setTab] = useState('');
  const cardFilters = {
    text: cardSearchText,
    rarities: cardRarities,
    manaCosts: cardManaCosts,
    supertypes,
    factions
  };
  const [deckInProgress, setDeckInProgress] = useState(initializeDeckBuilder());

  const onCollectionClick = (e, card) => {
    e && e.preventDefault();

    const newMainDeck = addCardToDeck(deckInProgress.mainDeck, {
      quantity: 1,
      card
    });

    setDeckInProgress({
      ...deckInProgress,
      mainDeck: newMainDeck
    });
  };

  const onPathClick = (e, path) => {
    setDeckInProgress({
      ...deckInProgress,
      deckPath: path
    });
  };

  const onPowerClick = (e, power) => {
    setDeckInProgress({
      ...deckInProgress,
      deckPower: power
    });
  };

  const deleteCardFromTable = id => {
    const newMainDeck = { ...deckInProgress.mainDeck };
    delete newMainDeck[id];

    setDeckInProgress({
      ...deckInProgress,
      mainDeck: newMainDeck
    });
  };

  const tabLabels = ['Cards', 'Paths', 'Powers'];

  return (
    <Layout title="Mythgard Hub | Deck Builder" desc="Build Mythgard Decks">
      <style jsx>{`
        .deck-builder-panels {
          display: flex;
          justify-content: space-between;
          align-items: flex-start;
        }
        .collection {
          flex-grow: 1;
        }
        .deck-builder-actions {
          width: 35%;
        }
        .deck-builder-actions button {
          margin-bottom: 10px;
        }
        .card-search-section {
          display: flex;
          justify-content: space-between;
        }
        .card-search-section button {
          width: 25%;
          height: 40px;
          margin: 52px 35px 20px 20px;
        }
        :global(.input-label) {
          width: 75%;
          margin: 30px 0 10px 0;
        }
      `}</style>
      <PageBanner image={PageBanner.IMG_DECK_BUILDER}>Deck Builder</PageBanner>
      <div className="deck-builder-panels">
        <div className="deck-builder-card-selection">
          <div className="card-search-section">
            <DeckBuilderSearchForm
              text={cardSearchText}
              setTab={setTab}
              setText={setCardSearchText}
            />
            <button>Clear Filters</button>
          </div>
          <FactionFilters onFactionClick={setFactions} />

          <RarityFilter onChange={setCardRarities}></RarityFilter>
          <ManaCostFilter onChange={setCardManaCosts} />
          <SupertypeFilter onChange={setSupertypes} />
          <TabGroup
            onChange={setTab}
            labels={tabLabels}
            name="cardsPathsPowers"
          />
          {currentTab === 'Cards' && (
            <div className="collection" data-cy="deckBuilderCollection">
              <SomeCards
                filters={cardFilters}
                onCardClick={onCollectionClick}
              />
            </div>
          )}
          {currentTab === 'Paths' && (
            <div className="collection" data-cy="deckBuilderPaths">
              <AllPaths onPathClick={onPathClick} />
            </div>
          )}
          {currentTab === 'Powers' && (
            <div className="collection" data-cy="deckBuilderPaths">
              <AllPowers onPowerClick={onPowerClick}></AllPowers>
            </div>
          )}
          <ImportedDeckErrors importedDeck={deckInProgress} />
        </div>
        <DeckBuilderSidebar
          deckInProgress={deckInProgress}
          setDeckInProgress={setDeckInProgress}
        />
      </div>
    </Layout>
  );
}

export default DeckBuilderPage;
