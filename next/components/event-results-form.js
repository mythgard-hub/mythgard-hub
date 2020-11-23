import PropTypes from 'prop-types';
import SingleEventResultForm from './single-event-result-form.js';
import useCreateEventResultMutaton from '../lib/use-create-event-result-mutation.js';
import useUpdateEventResultMutation from '../lib/use-update-event-result-mutation.js';
import useDeleteEventResultMutation from '../lib/use-delete-event-result-mutation.js';

export default function EventResultsForm({ eventId, eventResults }) {
  const [updateEventResultMutation] = useUpdateEventResultMutation();
  const [deleteEventResultMutation] = useDeleteEventResultMutation();
  const [createEventResultMutation] = useCreateEventResultMutaton();

  const updateEventResult = result =>
    updateEventResultMutation({ variables: result });

  const deleteEventResult = id => {
    if (confirm('Are you sure you want to delete that event result?')) {
      deleteEventResultMutation({ variables: { id } });
    }
  };

  const createEventResult = result =>
    createEventResultMutation({
      variables: {
        eventId,
        ...result
      }
    });

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
