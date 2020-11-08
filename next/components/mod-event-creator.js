import React from 'react';
import { useState } from 'react';
import { handleInputChangeHooks } from '../lib/form-utils.js';
import useCreateEventMutation from '../lib/use-create-event-mutation';

function modEventCreator() {
  const [name, setName] = useState('My cool event');
  const onChangeName = handleInputChangeHooks(setName);

  const organizer = 'org';
  const url = 'http://www.mythardhub.com';
  const date = '2000-01-01';

  const [createEventMutation] = useCreateEventMutation();
  const createEvent = () =>
    createEventMutation({ variables: { name, url, organizer, date } });

  return (
    <div>
      <h1>Create Event</h1>
      <label>
        Name: <input type="text" value={name} onChange={onChangeName} />
      </label>
      <br />
      <button style={{ width: 100 }} onClick={() => createEvent()}>
        Save
      </button>
    </div>
  );
}

export default modEventCreator;
