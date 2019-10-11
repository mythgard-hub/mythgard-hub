import React from 'react';
import PropTypes from 'prop-types';
import { ThemeContext } from '../components/theme-context.js';
import { useContext } from 'react';

function FeaturedTournament({ tournament: { name, organizer, date, url } }) {
  const theme = useContext(ThemeContext);
  return (
    <div className="featured-tournament">
      <style jsx>{`
        .featured-tournament {
          border: ${theme.sectionBorder};
          display: block;
          background-color: ${theme.panelBackground};
          padding: 10px;
          min-width: 266px;
          max-width: 300px;
          text-align: center;
          font-size: 16px;
        }

        .tournament-name {
          color: ${theme.fontColorAccent};
          font-weight: 700;
          text-decoration: none;
        }

        .tournament-name:hover {
          text-decoration: underline;
        }

        .tournament-organizer {
          margin: 2px 0 3px;
        }

        .tournament-date {
          color: ${theme.fontColorSubtle};
        }
      `}</style>
      <a className="external-link accent bold" href={url}>
        {name}
      </a>
      <div className="tournament-organizer">{organizer}</div>
      <div className="tournament-date">
        {new Date(date).toLocaleDateString('en-US', {
          year: 'numeric',
          month: 'short',
          day: 'numeric'
        })}
      </div>
    </div>
  );
}

FeaturedTournament.propTypes = {
  tournament: PropTypes.shape({
    name: PropTypes.string,
    organizer: PropTypes.string,
    date: PropTypes.string,
    url: PropTypes.string
  })
};

export default FeaturedTournament;
