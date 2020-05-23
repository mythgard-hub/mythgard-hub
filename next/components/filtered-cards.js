import PropTypes from 'prop-types';
import { executeCardQuery } from '../lib/card-queries.js';
import CardList from './card-list';
import ErrorMessage from './error-message';
import { cardSort } from '../lib/card.js';

function filteredCards({ filters, onCardClick }) {
  const {
    factions,
    text,
    rarities,
    manaCosts,
    supertypes,
    strengths,
    defenses
  } = filters;

  const { loading, error, data } = executeCardQuery(
    factions,
    text,
    rarities,
    manaCosts,
    supertypes,
    strengths,
    defenses
  );

  if (error) return <ErrorMessage message={error.message} />;
  if (loading) return null;

  const cards =
    data && data.cards && data.cards.nodes && data.cards.nodes.sort(cardSort);

  return <CardList onCardClick={onCardClick} cards={cards} />;
}

filteredCards.propTypes = {
  onCardClick: PropTypes.func,
  filters: PropTypes.shape({
    factions: PropTypes.array,
    text: PropTypes.string,
    rarities: PropTypes.array,
    manaCosts: PropTypes.array,
    supertypes: PropTypes.array,
    strengths: PropTypes.array,
    defenses: PropTypes.array
  }).isRequired
};

export default filteredCards;
