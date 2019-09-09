import React, { useState } from 'react';
import Layout from '../components/layout';
import { initializeDeckBuilder } from '../lib/deck-utils';
import DeckBuilderSearchForm from '../components/deck-builder-search-form';
import PageBanner from '../components/page-banner';
import FactionFilters from '../components/faction-filters';
import DeckBuilderSidebar from '../components/deck-builder-sidebar';
import CardSearchFilters from '../components/card-search-filters';
import SliderSwitch from '../components/slider-switch';
import DeckBuilderCardDisplay from '../components/deck-builder-card-display';

function DeckBuilderPage() {
  const [cardSearchText, setCardSearchText] = useState('');
  const [cardRarities, setCardRarities] = useState([]);
  const [cardManaCosts, setCardManaCosts] = useState([]);
  const [supertypes, setSupertypes] = useState([]);
  const [factions, setFactions] = useState([]);
  const [currentTab, setTab] = useState('');
  const [viewFilters, setViewFilters] = useState(false);
  const [deckInProgress, setDeckInProgress] = useState(initializeDeckBuilder());

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
          <SliderSwitch
            leftLabel="View Cards"
            rightLabel="View Filters"
            checked={viewFilters}
            onChange={() => {
              setViewFilters(prev => !prev);
            }}
            onClickLabel={setViewFilters}
          />
          {viewFilters && (
            <CardSearchFilters
              rarities={cardRarities}
              types={supertypes}
              manaCosts={cardManaCosts}
              setCardManaCosts={setCardManaCosts}
              setSupertypes={setSupertypes}
              setCardRarities={setCardRarities}
            />
          )}
          {!viewFilters && (
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
