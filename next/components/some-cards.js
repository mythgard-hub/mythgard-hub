import PropTypes from 'prop-types';
import AllCards from './all-cards';
import FilteredCards from './filtered-cards';

export default function SomeCards(props) {
  const { filters, onCardClick } = props;

  if (!filters) {
    return <AllCards onCardClick={onCardClick} />;
  } else {
    return <FilteredCards filters={filters} onCardClick={onCardClick} />;
  }
}

SomeCards.propTypes = {
  onCardClick: PropTypes.func,
  filters: PropTypes.shape({
    factions: PropTypes.array,
    text: PropTypes.string,
    rarity: PropTypes.string
  })
};
