import { useContext } from 'react';
import PropTypes from 'prop-types';
import CardSelectionItem from './card-selection-item';
import { ThemeContext } from './theme-context';

export default function CardSearchSelections({ onDismissClick, cards }) {
  const theme = useContext(ThemeContext);

  if (!cards || !cards.length) return null;

  return (
    <div>
      <style jsx>{`
        .cardSearchSelections {
          display: ${cards.length ? 'inline-block' : 'none'};
          list-style: none;
          margin: 0;
          width: 100%;
        }
        .cardSearchSelectionsTitle {
          font-weight: bold;
          color: ${theme.smallTitleColor};
        }
      `}</style>
      <div className="cardSearchSelectionsTitle">Includes cards:</div>
      <ul className="cardSearchSelections" data-cy="cardSearchSelections">
        {cards.map((card, index) => (
          <CardSelectionItem
            key={card.id ? card.id : index}
            card={card}
            onDismissClick={onDismissClick}
          />
        ))}
      </ul>
    </div>
  );
}
CardSearchSelections.propTypes = {
  cards: PropTypes.array.isRequired,
  onDismissClick: PropTypes.func.isRequired
};
