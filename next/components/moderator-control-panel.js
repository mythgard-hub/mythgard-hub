import React from 'react';
import PropTypes from 'prop-types';
import ModeratorDeckEditor from './moderator-deck-editor.js';
import ModeratorConfigEditor from './moderator-config-editor.js';
import ModeratorFeaturedDecksEditor from './moderator-featured-decks-editor.js';
import ModAccountEditor from './mod-account-editor.js';
import ModEventCreator from './mod-event-creator.js';

function moderatorControlPanel() {
  return (
    <>
      <ModeratorDeckEditor />
      <hr />
      <ModeratorConfigEditor />
      <hr />
      <ModeratorFeaturedDecksEditor />
      <hr />
      <ModAccountEditor />
      <hr />
      <ModEventCreator />
    </>
  );
}

moderatorControlPanel.propTypes = {
  modUser: PropTypes.object
};

export default moderatorControlPanel;
