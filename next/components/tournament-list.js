import Link from 'next/link';
import PropTypes from 'prop-types';

TournamentList.propTypes = {
  tournaments: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      name: PropTypes.string.isRequired
    })
  )
};

export default function TournamentList({ tournaments }) {
  return (
    <ul data-cy="tournamentList">
      {tournaments.map((tourney, index) => (
        <li key={tourney.id} data-cy="tournamentListItem">
          {tourney.id + ' '}
          <Link href={`/tournament?id=${tourney.id}`} key={index}>
            <a>{tourney.name}</a>
          </Link>
          {' Date: ' + tourney.date}
        </li>
      ))}
    </ul>
  );
}
