import SomeCards from '../components/some-cards';
import AllPaths from '../components/all-paths';
import AllPowers from '../components/all-powers';
import ImportedDeckErrors from '../components/imported-deck-errors';
import TabGroup from '../components/tab-group';
import { addCardToDeck } from '../lib/deck-utils';

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
    factions
  } = props;

  const cardFilters = {
    text: cardSearchText,
    rarities: cardRarities,
    manaCosts: cardManaCosts,
    supertypes,
    factions
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

  const tabLabels = ['Cards', 'Paths', 'Powers'];

  return (
    <div>
      <style jsx>{`
        .collection {
          flex-grow: 1;
        }
      `}</style>
      <TabGroup onChange={setTab} labels={tabLabels} name="cardsPathsPowers" />
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
