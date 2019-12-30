import { useContext } from 'react';
import PropTypes from 'prop-types';
import { ThemeContext } from './theme-context';
import { getRarityCounts } from '../lib/deck-stats';

export default function DeckRarityCounts({ cards }) {
  const theme = useContext(ThemeContext);
  const rarityCounts = getRarityCounts(cards);

  return (
    <div className="deck-rarity-counts" data-cy="deckRarityCounts">
      <style jsx>{`
        .deck-rarity-counts {
          display: flex;
        }
        .rarity-count {
          display: flex;
          margin-right: 30px;
        }
        .rarity-image {
          height: 20px;
          margin-right: 5px;
        }
      `}</style>
      {rarityCounts.map((r, i) => (
        <div key={i} className="rarity-count">
          <img className="rarity-image" src={r.link} /> {r.count}
        </div>
      ))}
    </div>
  );
}

DeckRarityCounts.propTypes = {
  cards: PropTypes.array
};
