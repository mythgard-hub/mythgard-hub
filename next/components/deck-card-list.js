import PropTypes from 'prop-types';
import CardListItem from './card-list-item';

export default function DeckCardList({ deckCards }) {
  return (
    <ul className="deckCardList" data-cy="deckCardList">
      {deckCards.map((deckCard, index) => (
        <li key={index}>
          <CardListItem card={deckCard.card} />
          <span> X {deckCard.quantity}</span>
        </li>
      ))}
    </ul>
  );
}

DeckCardList.propTypes = {
  deckCards: PropTypes.arrayOf(
    PropTypes.shape({
      quantity: PropTypes.number.isRequired,
      card: PropTypes.shape({
        id: PropTypes.number.isRequired,
        name: PropTypes.string.isRequired
      }).isRequired
    })
  ).isRequired
};
