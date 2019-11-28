// import React from 'react';
// import PropTypes from 'prop-types';
// import { useState } from 'react';
// import { useMutation } from '@apollo/react-hooks';
import useConfig from '../lib/use-config.js';
// import { handleInputChangeHooks } from '../lib/form-utils.js';
// import { updateDeck as deckQuery } from '../lib/deck-queries.js';

function ModeratorConfigEditor() {
  const { config, error, loading } = useConfig();

  if (error) {
    return 'error loading config';
  }

  if (loading) {
    return 'loading config';
  }

  const topMediaInputs = config.topMedia.map((media, i) => (
    <div key={i}>foo</div>
  ));

  return (
    <>
      <h2>Edit Site Settings</h2>
      {topMediaInputs}
    </>
  );
}

// ModeratorConfigEditor.propTypes = {
//   modUser: PropTypes.object
// };

export default ModeratorConfigEditor;
