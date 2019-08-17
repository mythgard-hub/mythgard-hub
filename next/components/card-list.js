import PropTypes from 'prop-types';
import CardListItem from './card-list-item';

export default function CardList({ onCardClick, cards }) {
  return (
    <ul className="cardList" data-cy="cardList">
      {cards.map((card, index) => (
        <li key={card.id ? card.id : index}>
          <CardListItem card={card} onClick={onCardClick} />
        </li>
      ))}
    </ul>
  );
}
CardList.propTypes = {
  cards: PropTypes.array,
  onCardClick: PropTypes.func
};
