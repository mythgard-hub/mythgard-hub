import { useQuery } from '@apollo/client';
import { allTournaments } from '../lib/tournament-queries.js';
import EventForm from './event-form.js';
import EventResultsForm from './event-results-form.js';
import useUpdateEventMutation from '../lib/use-update-event-mutation.js';
import useDeleteEventMutation from '../lib/use-delete-event-mutation.js';

function modEditEvents() {
  const { data } = useQuery(allTournaments);
  const events = data && data.tournaments && data.tournaments.nodes;

  const [updateEventMutation] = useUpdateEventMutation();
  const [deleteEventMutation] = useDeleteEventMutation();

  const updateEvent = ({ id, name, url, organizer, date }) =>
    updateEventMutation({ variables: { id, name, url, organizer, date } });

  const eventResults = e => e.tournamentDecks && e.tournamentDecks.nodes;

  const deleteEvent = id => {
    if (confirm('Are you sure you want to delete that event?')) {
      deleteEventMutation({ variables: { id } });
    }
  };

  const eventList =
    events &&
    events.map &&
    events.map(e => (
      <div key={e.id}>
        <EventForm existingEvent={e} onSave={updateEvent}>
          <button
            style={{ width: '200px', marginLeft: '20px' }}
            onClick={() => deleteEvent(e.id)}
          >
            Delete Event
          </button>
        </EventForm>
        <EventResultsForm eventId={e.id} eventResults={eventResults(e)} />
        <hr />
      </div>
    ));

  return (
    <div>
      <h2>Public Events</h2>
      {eventList}
    </div>
  );
}

export default modEditEvents;
