import { useQuery } from '@apollo/react-hooks';
import { allTournaments } from '../lib/tournament-queries.js';
import EventForm from './event-form.js';

function modEditEvents() {
  const { data } = useQuery(allTournaments);
  const events = data && data.tournaments && data.tournaments.nodes;

  const eventList =
    events &&
    events.map &&
    events.map(e => (
      <EventForm
        key={e.id}
        existingEvent={e}
        onSave={(...args) => alert(JSON.stringify(args[0]))}
      />
    ));

  return (
    <div>
      <style jsx>{``}</style>
      {JSON.stringify(data)}
      <h2>Public Events</h2>
      {eventList}
    </div>
  );
}

export default modEditEvents;
