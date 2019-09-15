import React, { useState, useCallback } from 'react';
import Layout from '../components/layout';
import { initializeDeckBuilder } from '../lib/deck-utils';
import DeckBuilderSearchForm from '../components/deck-builder-search-form';
import PageBanner from '../components/page-banner';
import FactionFilters from '../components/faction-filters';
import DeckBuilderSidebar from '../components/deck-builder-sidebar';
import CardSearchFilters from '../components/card-search-filters';
import SliderSwitch from '../components/slider-switch';
import DeckBuilderCardDisplay from '../components/deck-builder-card-display';

const initialSearchFilters = {
  cardSearchText: '',
  cardRarities: [],
  cardManaCosts: [],
  supertypes: [],
  factions: []
};

function DeckBuilderPage() {
  const [cardSearchText, setCardSearchText] = useState(
    initialSearchFilters.cardSearchText
  );
  const [cardRarities, setCardRarities] = useState(
    initialSearchFilters.cardRarities
  );
  const [cardManaCosts, setCardManaCosts] = useState(
    initialSearchFilters.cardManaCosts
  );
  const [supertypes, setSupertypes] = useState(initialSearchFilters.supertypes);
  const [factions, setFactions] = useState(initialSearchFilters.factions);
  const [currentTab, setTab] = useState('');
  const [viewFilters, setViewFilters] = useState(false);
  const [deckInProgress, setDeckInProgress] = useState(initializeDeckBuilder());

  const handleClearFilters = useCallback(() => {
    setCardSearchText(initialSearchFilters.cardSearchText);
    setCardRarities(initialSearchFilters.cardRarities);
    setCardManaCosts(initialSearchFilters.cardManaCosts);
    setSupertypes(initialSearchFilters.supertypes);
    setFactions(initialSearchFilters.factions);
  });

  return (
    <Layout title="Mythgard Hub | Deck Builder" desc="Build Mythgard Decks">
      <style jsx>{`
        .deck-builder-card-selection {
          width: 100%;
          padding-right: 25px;
        }
        .deck-builder-panels {
          display: flex;
          justify-content: space-between;
          align-items: flex-start;
        }
        .collection {
          flex-grow: 1;
        }

        @media only screen and (max-width: 600px) {
          .deck-builder-panels {
            flex-direction: column-reverse;
          }

          .deck-builder-card-selection {
            padding-right: 0;
          }
        }
      `}</style>
      <PageBanner image={PageBanner.IMG_DECK_BUILDER}>Deck Builder</PageBanner>
      <div className="deck-builder-panels">
        <div className="deck-builder-card-selection">
          <DeckBuilderSearchForm
            text={cardSearchText}
            setTab={setTab}
            setText={setCardSearchText}
            onClearFilters={handleClearFilters}
          />
          <FactionFilters factions={factions} onFactionClick={setFactions} />
          <SliderSwitch
            leftSlider="View Cards"
            rightSlider="View Filters"
            checked={viewFilters}
            onChange={() => {
              setViewFilters(prev => !prev);
            }}
            onClickLabel={setViewFilters}
          />
          {viewFilters ? (
            <CardSearchFilters
              rarities={cardRarities}
              types={supertypes}
              manaCosts={cardManaCosts}
              setCardManaCosts={setCardManaCosts}
              setSupertypes={setSupertypes}
              setCardRarities={setCardRarities}
            />
          ) : (
            <DeckBuilderCardDisplay
              currentTab={currentTab}
              setTab={setTab}
              deckInProgress={deckInProgress}
              setDeckInProgress={setDeckInProgress}
              cardSearchText={cardSearchText}
              cardRarities={cardRarities}
              cardManaCosts={cardManaCosts}
              supertypes={supertypes}
              factions={factions}
            />
          )}
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
