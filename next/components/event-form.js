import React from 'react';
import { useState } from 'react';
import { handleInputChangeHooks } from '../lib/form-utils.js';
import { formatDate } from '../lib/graphql-utils.js';
import PropTypes from 'prop-types';

function EventForm({ onSave, existingEvent = {} }) {
  const [name, setName] = useState(existingEvent.name || 'My cool event');
  const onChangeName = handleInputChangeHooks(setName);

  const [organizer, setOrganizer] = useState(
    existingEvent.organizer || 'organizer'
  );
  const onChangeOrganizer = handleInputChangeHooks(setOrganizer);

  const [url, setUrl] = useState(
    existingEvent.url || 'https://www.mythgardhub.com/'
  );
  const onChangeUrl = handleInputChangeHooks(setUrl);

  const existingDate = existingEvent.date && new Date(existingEvent.date);
  const [date, setDate] = useState(formatDate(existingDate || new Date()));
  const onChangeDate = handleInputChangeHooks(setDate);

  const saveForm = () =>
    onSave({ name, url, organizer, date, id: existingEvent.id });

  return (
    <div>
      <style jsx>{`
        label {
          display: inline-block;
          margin: 0px 20px 20px;
          white-space: nowrap;
        }
      `}</style>
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
        Date: <input type="date" value={date} onChange={onChangeDate} />
      </label>
      <br />
      <button style={{ width: 100 }} onClick={() => saveForm()}>
        Save
      </button>
    </div>
  );
}

EventForm.propTypes = {
  onSave: PropTypes.func.isRequired,
  existingEvent: PropTypes.shape({
    name: PropTypes.string,
    organizer: PropTypes.string,
    url: PropTypes.string,
    date: PropTypes.string
  })
};

export default EventForm;
