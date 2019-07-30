import Link from 'next/link';
import PropTypes from 'prop-types';

TournamentList.propTypes = {
  tournaments: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.required,
      name: PropTypes.string.required
    })
  )
};

export default function TournamentList({ tournaments }) {
  return (
    <ul className="tournamentList">
      {tournaments.map((tourney, index) => (
        <li key={tourney.id}>
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
