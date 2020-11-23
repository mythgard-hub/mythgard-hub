import PropTypes from 'prop-types';
import SingleEventResultForm from './single-event-result-form.js';

export default function EventResultsForm({ eventId, eventResults }) {
  // const [createEventMutation] = useCreateEventResultMutation();
  // const createEvent = ({ name, url, organizer, date }) =>
  // createEventMutation({ variables: { name, url, organizer, date } });
  const createEventResult = () => alert('create event result');

  return (
    <div>
      <h4>Results:</h4>
      {eventId} {JSON.stringify(eventResults)}
      <SingleEventResultForm onSave={createEventResult} />
    </div>
  );
}

EventResultsForm.propTypes = {
  eventId: PropTypes.number,
  eventResults: PropTypes.array
};
