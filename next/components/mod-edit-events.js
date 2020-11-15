import { useQuery } from '@apollo/react-hooks';
import { allTournaments } from '../lib/tournament-queries.js';
import EventForm from './event-form.js';
import useUpdateEventMutation from '../lib/use-update-event-mutation.js';

function modEditEvents() {
  const { data } = useQuery(allTournaments);
  const events = data && data.tournaments && data.tournaments.nodes;

  const [updateEventMutation] = useUpdateEventMutation();

  const updateEvent = ({ id, name, url, organizer, date }) =>
    updateEventMutation({ variables: { id, name, url, organizer, date } });

  const eventList =
    events &&
    events.map &&
    events.map(e => (
      <div key={e.id}>
        <EventForm existingEvent={e} onSave={updateEvent} />
        <hr />
      </div>
    ));

  return (
    <div>
      <style jsx>{``}</style>
      <h2>Public Events</h2>
      {eventList}
    </div>
  );
}

export default modEditEvents;
