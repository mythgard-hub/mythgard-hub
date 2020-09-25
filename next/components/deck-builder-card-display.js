import SomeCards from '../components/some-cards';
import AllPaths from '../components/all-paths';
import AllPowers from '../components/all-powers';
import ImportedDeckErrors from '../components/imported-deck-errors';
import TabGroup from '../components/tab-group';
import { addCardToDeck } from '../lib/deck-utils';
import PropTypes from 'prop-types';
import { DECK_BUILDER_TABS } from '../constants/deck';

export default function DeckBuilderCardDisplay(props) {
  const {
    currentTab,
    setTab,
    deckInProgress,
    setDeckInProgress,
    cardSearchText,
    cardRarities,
    cardManaCosts,
    supertypes,
    factions,
    cardset
  } = props;

  const cardFilters = {
    text: cardSearchText,
    rarities: cardRarities,
    manaCosts: cardManaCosts,
    supertypes,
    factions,
    cardset
  };

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

  return (
    <div>
      <style jsx>{`
        .collection {
          flex-grow: 1;
        }
      `}</style>
      <TabGroup
        selectedLabel={currentTab}
        onChange={setTab}
        labels={DECK_BUILDER_TABS}
        name="cardsPathsPowers"
      />
      {currentTab === 'Cards' && (
        <div className="collection" data-cy="deckBuilderCollection">
          <SomeCards filters={cardFilters} onCardClick={onCollectionClick} />
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
  );
}

DeckBuilderCardDisplay.propTypes = {
  currentTab: PropTypes.string,
  setTab: PropTypes.func,
  deckInProgress: PropTypes.object,
  setDeckInProgress: PropTypes.func,
  cardSearchText: PropTypes.string,
  cardRarities: PropTypes.array,
  cardManaCosts: PropTypes.array,
  supertypes: PropTypes.array,
  factions: PropTypes.array,
  cardset: PropTypes.string
};
