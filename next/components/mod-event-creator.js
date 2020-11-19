import React from 'react';
import useCreateEventMutation from '../lib/use-create-event-mutation';
import EventForm from './event-form.js';

function modEventCreator() {
  const [createEventMutation] = useCreateEventMutation();
  const createEvent = ({ name, url, organizer, date }) =>
    createEventMutation({ variables: { name, url, organizer, date } });

  return (
    <div>
      <h2>Create Event</h2>
      <EventForm onSave={createEvent} />
    </div>
  );
}

export default modEventCreator;
