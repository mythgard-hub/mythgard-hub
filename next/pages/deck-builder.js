import React, { useState } from 'react';
import SomeCards from '../components/some-cards';
import AllPaths from '../components/all-paths';
import AllPowers from '../components/all-powers';
import Layout from '../components/layout';
import ImportedDeckErrors from '../components/imported-deck-errors';
import { initializeDeckBuilder, addCardToDeck } from '../lib/deck-utils';
import DeckBuilderSearchForm from '../components/deck-builder-search-form';
import PageBanner from '../components/page-banner';
import FactionFilters from '../components/faction-filters';
import RarityFilter from '../components/rarity-filter';
import ManaCostFilter from '../components/mana-cost-filter';
import SupertypeFilter from '../components/supertype-filter';
import TabGroup from '../components/tab-group';
import DeckBuilderSidebar from '../components/deck-builder-sidebar';
import DeckBuilderAdditionalFilters from '../components/deck-builder-additional-filters';

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

  const onCollectionClick = (_, card) => {
    const newMainDeck = addCardToDeck(deckInProgress.mainDeck, {
      quantity: 1,
      card
    });

    setDeckInProgress({
      ...deckInProgress,
      mainDeck: newMainDeck
    });
  };

  const onPathClick = (_, path) => {
    setDeckInProgress({
      ...deckInProgress,
      deckPath: path
    });
  };

  const onPowerClick = (_, power) => {
    setDeckInProgress({
      ...deckInProgress,
      deckPower: power
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
        :global(.input-label) {
          width: 75%;
          margin: 30px 0 10px 0;
        }
      `}</style>
      <PageBanner image={PageBanner.IMG_DECK_BUILDER}>Deck Builder</PageBanner>
      <div className="deck-builder-panels">
        <div className="deck-builder-card-selection">
          <DeckBuilderSearchForm
            text={cardSearchText}
            setTab={setTab}
            setText={setCardSearchText}
          />
          <FactionFilters onFactionClick={setFactions} />
          <DeckBuilderAdditionalFilters
            setCardManaCosts={setCardManaCosts}
            setSupertypes={setSupertypes}
            setCardRarities={setCardRarities}
          />
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
