import { useContext } from 'react';
import PropTypes from 'prop-types';
import { ThemeContext } from './theme-context';

export default function UpvoteIndicator({ votes }) {
  const theme = useContext(ThemeContext);
  const iconUrl = `${process.env.MG_CDN}/filters/uparrow.png`;

  return (
    <span>
      <style jsx>{`
        span {
          color: ${theme.votesColor};
          font-weight: bold;
          font-size: 18px;
        }
        img {
          max-height: 12px;
          margin-right: 3px;
        }
      `}</style>
      <img src={iconUrl} />
      <span data-cy="deckVotesCell">{votes}</span>
    </span>
  );
}

UpvoteIndicator.propTypes = {
  votes: PropTypes.number
};
