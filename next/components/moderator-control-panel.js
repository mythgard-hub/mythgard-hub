import React from 'react';
import PropTypes from 'prop-types';
import ModeratorDeckEditor from './moderator-deck-editor.js';
import ModeratorConfigEditor from './moderator-config-editor.js';
import ModeratorFeaturedDecksEditor from './moderator-featured-decks-editor.js';
import ModAccountEditor from './mod-account-editor.js';
import ModEventCreator from './mod-event-creator.js';
import ModEditEvents from './mod-edit-events.js';
import ModEditSpoilers from './mod-edit-spoilers.js';
import TabGroup from './tab-group.js';
import { useState } from 'react';

function moderatorControlPanel() {
  const tabs = ['Decks', 'Config and Media', 'Accounts', 'Events', 'Spoilers'];
  const [currentTab, setChosenTab] = useState('Decks');
  const onChangeTab = tab => setChosenTab(tab);

  return (
    <>
      <style jsx>{`
        :global(.mg-tab-group) {
          margin: 20px 0;
        }
      `}</style>
      <TabGroup
        labels={tabs}
        selectedLabel={currentTab}
        onChange={onChangeTab}
        name={'modTabs'}
      />
      {currentTab === 'Decks' && (
        <div>
          <ModeratorDeckEditor />
          <hr />
          <ModeratorFeaturedDecksEditor />
        </div>
      )}
      {currentTab === 'Config and Media' && <ModeratorConfigEditor />}
      {currentTab === 'Accounts' && <ModAccountEditor />}
      {currentTab === 'Events' && (
        <div>
          <ModEventCreator />
          <hr />
          <ModEditEvents />
        </div>
      )}
      {currentTab === 'Spoilers' && <ModEditSpoilers />}
    </>
  );
}

moderatorControlPanel.propTypes = {
  modUser: PropTypes.object
};

export default moderatorControlPanel;
