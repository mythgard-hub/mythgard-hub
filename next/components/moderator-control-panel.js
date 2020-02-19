import React from 'react';
import PropTypes from 'prop-types';
import ModeratorDeckEditor from './moderator-deck-editor.js';
import ModeratorConfigEditor from './moderator-config-editor.js';

function moderatorControlPanel() {
  return (
    <>
      <ModeratorDeckEditor />
      <hr />
      <ModeratorConfigEditor />
      <hr />
      <h1>Edit Featured Decks</h1>
    </>
  );
}

moderatorControlPanel.propTypes = {
  modUser: PropTypes.object
};

export default moderatorControlPanel;
