import React from 'react';
import { useState } from 'react';
import { handleInputChangeHooks } from '../lib/form-utils.js';
import useCreateEventMutation from '../lib/use-create-event-mutation';

function modEventCreator() {
  const [name, setName] = useState('My cool event');
  const onChangeName = handleInputChangeHooks(setName);
  const [organizer, setOrganizer] = useState('organizer');
  const onChangeOrganizer = handleInputChangeHooks(setOrganizer);
  const [url, setUrl] = useState('https://www.mythgardhub.com/');
  const onChangeUrl = handleInputChangeHooks(setUrl);
  const [date, setDate] = useState('2000-01-01');
  const onChangeDate = handleInputChangeHooks(setDate);

  const [createEventMutation] = useCreateEventMutation();
  const createEvent = () =>
    createEventMutation({ variables: { name, url, organizer, date } });

  return (
    <div>
      <style jsx>{`
        label {
          display: inline-block;
          margin: 0px 20px 20px;
          white-space: nowrap;
        }
      `}</style>
      <h1>Create Event</h1>
      <label>
        Name: <input type="text" value={name} onChange={onChangeName} />
      </label>
      <label>
        Organizer:{' '}
        <input type="text" value={organizer} onChange={onChangeOrganizer} />
      </label>
      <label>
        Url: <input type="text" value={url} onChange={onChangeUrl} />
      </label>
      <label>
        Date: <input type="text" value={date} onChange={onChangeDate} />
      </label>
      <br />
      <button style={{ width: 100 }} onClick={() => createEvent()}>
        Save
      </button>
    </div>
  );
}

export default modEventCreator;
