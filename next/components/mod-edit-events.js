import { useState } from 'react';
import { handleInputChangeHooks } from '../lib/form-utils.js';
import { formatDate } from '../lib/graphql-utils.js';
import useCreateEventMutation from '../lib/use-create-event-mutation';
import { useQuery } from '@apollo/react-hooks';
import { allTournaments } from '../lib/tournament-queries.js';

function modEditEvents() {
  const { loading, error, data } = useQuery(allTournaments);
  // const [name, setName] = useState('My cool event');
  // const onChangeName = handleInputChangeHooks(setName);
  // const [organizer, setOrganizer] = useState('organizer');
  // const onChangeOrganizer = handleInputChangeHooks(setOrganizer);
  // const [url, setUrl] = useState('https://www.mythgardhub.com/');
  // const onChangeUrl = handleInputChangeHooks(setUrl);
  // const [date, setDate] = useState(formatDate(new Date()));
  // const onChangeDate = handleInputChangeHooks(setDate);

  // const [createEventMutation] = useCreateEventMutation();
  // const createEvent = () =>
  //   createEventMutation({ variables: { name, url, organizer, date } });
  //

  return (
    <div>
      <style jsx>{``}</style>
      <h2>Event results</h2>
      {JSON.stringify(data)}
    </div>
  );
}

export default modEditEvents;
