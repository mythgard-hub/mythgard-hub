import PropTypes from 'prop-types';
import GemCost from './gem-cost.js';
import { imagePathMedium as getImagePath } from '../lib/card.js';
import { RARITY_IMAGES } from '../constants/rarities.js';
import { SUPERTYPE_IMAGES } from '../constants/supertypes.js';

const firstLetterUppercase = str => {
  return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
};

export default function Card({ card }) {
  const imagePath = getImagePath(card.name, card.set);
  const imageAlt = card.name;
  // Technically this is an array but in actuality all cards should have
  // a single super type.
  const supertype = card.supertype[0] || '';
  let factions = [];
  try {
    factions = card.cardFactions.nodes.map(n =>
      firstLetterUppercase(n.faction.name)
    );
  } catch (error) {
    console.error('Something went wrong trying to read card factions', error);
  }
  let spawns = [];
  try {
    spawns = card.cardSpawns.nodes.map(n => n.spawn.name);
  } catch (error) {
    console.error('Something went wrong trying to read card spawns', error);
  }
  return (
    <>
      <style jsx>{`
        .card-components {
          display: flex;
          flex-wrap: wrap;
        }
        .card-image {
          flex: 1;
          max-width: 100%;
          height: auto;
        }
        ul.card-details {
          flex: 2;
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
        hr {
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
        .rarity-icon {
          height: 22px;
        }
        .supertype-icon {
          height: 22px;
        }
        .spawns hr {
          margin-bottom: 15px;
        }
        .tokens {
          display: flex;
          margin-bottom: 15px;
        }
        .token-image {
          max-width: 222px;
          height: auto;
          margin-right: 15px;
        }
      `}</style>
      <div>
        <h1 data-cy="cardName" className="cardName">
          {card.name}
        </h1>
        <div className="card-components">
          <div>
            <img className="card-image" src={imagePath} alt={imageAlt} />
          </div>
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
              <div className="card-detail-text">
                {card.mana} <GemCost costString={card.gem} />
              </div>
            </li>
            <li className="card-detail">
              <div className="card-detail-label">Type</div>
              <hr />
              <div className="card-detail-text">
                <img
                  src={SUPERTYPE_IMAGES[supertype.toLowerCase()]}
                  className="supertype-icon"
                />{' '}
                {firstLetterUppercase(supertype)}
              </div>
            </li>
            <li className="card-detail">
              <div className="card-detail-label">Rarity</div>
              <hr />
              <div className="card-detail-text">
                <img
                  src={RARITY_IMAGES[card.rarity.toLowerCase()]}
                  className="rarity-icon"
                />{' '}
                {firstLetterUppercase(card.rarity)}
              </div>
            </li>
            <li className="card-detail">
              <div className="card-detail-label">Subtype</div>
              <hr />
              <div className="card-detail-text">{card.subtype}</div>
            </li>
            {(card.atk || card.def) && (
              <li className="card-detail">
                <div className="card-detail-label">Attack/Health</div>
                <hr />
                <div className="card-detail-text">
                  {card.atk}/{card.def}
                </div>
              </li>
            )}
            <li className="card-detail">
              <div className="card-detail-label">Card Set</div>
              <hr />
              <div className="card-detail-text">Core</div>
            </li>
          </ul>
        </div>
        {spawns.length > 0 && (
          <div className="spawns">
            <div className="card-detail-label">Tokens</div>
            <hr />
            <div className="tokens">
              {spawns.map((spawn, ix) => {
                const spawnImagePath = getImagePath(spawn);
                return (
                  <img
                    key={ix}
                    className="token-image"
                    src={spawnImagePath}
                    alt={spawn}
                  />
                );
              })}
            </div>
          </div>
        )}
      </div>
    </>
  );
}
Card.propTypes = {
  card: PropTypes.shape({
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    supertype: PropTypes.arrayOf(PropTypes.string).isRequired,
    mana: PropTypes.number,
    gem: PropTypes.string,
    rarity: PropTypes.string,
    subtype: PropTypes.string,
    atk: PropTypes.number,
    def: PropTypes.number,
    rules: PropTypes.string,
    set: PropTypes.string,
    cardFactions: PropTypes.shape({
      nodes: PropTypes.arrayOf(
        PropTypes.shape({
          faction: PropTypes.shape({
            name: PropTypes.string
          })
        })
      )
    }),
    cardSpawns: PropTypes.shape({
      nodes: PropTypes.arrayOf(
        PropTypes.shape({
          spawn: PropTypes.shape({
            name: PropTypes.string
          })
        })
      )
    })
  })
};
