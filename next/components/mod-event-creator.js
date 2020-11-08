import React from 'react';
import { useState } from 'react';
import { handleInputChangeHooks } from '../lib/form-utils.js';

function modEventCreator() {
  const [name, setName] = useState('My cool event');
  const onChangeName = handleInputChangeHooks(setName);

  const createEvent = () => alert('create event');

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
