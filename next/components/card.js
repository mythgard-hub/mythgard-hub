import PropTypes from 'prop-types';
import { imagePathMedium as getImagePath } from '../lib/card.js';

export default function Card({ card }) {
  const imagePath = getImagePath(card.name, card.set);
  const imageAlt = card.name;
  const factions = card.cardFactions.nodes.map(
    n => n.faction.name.charAt(0).toUpperCase() + n.faction.name.slice(1)
  );
  return (
    <>
      <style jsx>{`
        .card-components {
          display: flex;
        }
        .card-image {
          min-width: 320px;
          max-width: 320px;
        }
        ul.card-details {
          list-style: none;
          display: flex;
          flex-wrap: wrap;
        }
        li.card-detail {
          min-width: 220px;
        }
        .card-detail-label {
          font-size: 1em;
          font-weight: 600;
          color: #458a9e;
          font-style: italic;
          text-align: left;
          margin-top: 20px;
          margin-bottom: 5px;
          text-transform: uppercase;
        }
        .card-detail hr {
          margin-top: 0px;
          margin-bottom: 0px;
          margin-left: auto;
          margin-right: auto;
          width: 100%;
          border: 0;
          height: 1px;
          background-image: linear-gradient(
            to right,
            #458a9e,
            #458a9e,
            #1c2d35
          );
        }
        .card-detail-text {
          font-weight: 400;
          font-size: 1.8em;
          margin-bottom: 18px;
        }
      `}</style>
      <div>
        <h1 data-cy="cardName" className="cardName">
          {card.name}
        </h1>
        <div className="card-components">
          <img className="card-image" src={imagePath} alt={imageAlt} />
          <ul className="card-details">
            <li className="card-detail">
              <div className="card-detail-label">Faction</div>
              <hr />
              <div className="card-detail-text">{factions[0]}</div>
            </li>
            <li className="card-detail">
              <div className="card-detail-label">Secondary Faction</div>
              <hr />
              <div className="card-detail-text">{factions[1]}</div>
            </li>
            <li className="card-detail">
              <div className="card-detail-label">Cost</div>
              <hr />
              <div className="card-detail-text">{card.mana} {card.gem}</div>
            </li>
            <li className="card-detail">
              <div className="card-detail-label">Type</div>
              <hr />
              <div className="card-detail-text">{card.supertype}</div>
            </li>
            <li className="card-detail">
              <div className="card-detail-label">Rarity</div>
              <hr />
              <div className="card-detail-text">Meh</div>
            </li>
            <li className="card-detail">
              <div className="card-detail-label">Subtype</div>
              <hr />
              <div className="card-detail-text">{card.name}</div>
            </li>
            <li className="card-detail">
              <div className="card-detail-label">Card Set</div>
              <hr />
              <div className="card-detail-text">Core</div>
            </li>
          </ul>
        </div>
        <div data-cy="cardRules">rules: {card.rules}</div>
      </div>
    </>
  );
}
Card.propTypes = {
  card: PropTypes.shape({
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    rules: PropTypes.string,
    set: PropTypes.string
  })
};
