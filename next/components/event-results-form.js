import PropTypes from 'prop-types';
import SingleEventResultForm from './single-event-result-form.js';
import useCreateEventResultMutaton from '../lib/use-create-event-result-mutation.js';
import useDeleteEventResultMutation from '../lib/use-delete-event-result-mutation.js';

export default function EventResultsForm({ eventId, eventResults }) {
  const [createEventResultMutation] = useCreateEventResultMutaton();
  const [deleteEventResultMutation] = useDeleteEventResultMutation();
  // const [createEventMutation] = useCreateEventResultMutation();
  // const createEvent = ({ name, url, organizer, date }) =>
  // createEventMutation({ variables: { name, url, organizer, date } });
  const createEventResult = result =>
    createEventResultMutation({
      variables: {
        eventId,
        ...result
      }
    });

  const deleteEventResult = id =>
    deleteEventResultMutation({ variables: { id } });

  const updateEventResult = () => alert(JSON.stringify(arguments));

  return (
    <div>
      <h4>Results:</h4>
      {eventResults.map(r => (
        <SingleEventResultForm
          key={r.id}
          existingResult={r}
          onSave={updateEventResult}
        >
          <button onClick={() => deleteEventResult(r.id)}>Delete</button>
        </SingleEventResultForm>
      ))}
      <SingleEventResultForm onSave={createEventResult} label={'Add'} />
    </div>
  );
}

EventResultsForm.propTypes = {
  eventId: PropTypes.number,
  eventResults: PropTypes.array
};
