import React from 'react';
import PropTypes from 'prop-types';
import { useState } from 'react';
import { handleInputChangeHooks } from '../lib/form-utils.js';

function ModeratorPatchConfig({ url, version, updatePatchVersion }) {
  const [newUrl, setUrl] = useState(url);
  const onChangeUrl = handleInputChangeHooks(setUrl);
  const [newPatchVersion, setPatchVersion] = useState(version);
  const onChangePatchVersion = handleInputChangeHooks(setPatchVersion);

  const onClick = () => {
    updatePatchVersion({
      url: newUrl,
      version: newPatchVersion
    });
  };
  return (
    <div>
      <style jsx>{`
        .adForm {
          display: flex;
          flex-wrap: wrap;
        }
        label {
          flex-grow: 1;
          display: block;
          min-width: 400px;
          margin: 10px 20px;
        }

        input[type='text'] {
          display: block;
          width: 100%;
        }
        input[type='checkbox'] {
          display: inline;
        }
        button {
          display: inline;
          width: auto;
          padding: 5px 40px;
          margin: 0 20px 0 0;
        }
      `}</style>
      <div className="adForm">
        <label>
          <input type="text" value={newUrl} onChange={onChangeUrl}></input>
          Patch Notes Version
        </label>
        <label>
          <input
            type="text"
            value={newPatchVersion}
            onChange={onChangePatchVersion}
          ></input>{' '}
          Version Number
        </label>
      </div>
      <div>
        <button onClick={onClick}>Save</button>
      </div>
    </div>
  );
}

ModeratorPatchConfig.defaultProps = {
  url:
    'https://www.mythgardgame.com/permalink/patch-notes-v0-17-3---holiday-edition',
  version: '0.17.3'
};

ModeratorPatchConfig.propTypes = {
  url: PropTypes.string,
  version: PropTypes.string,
  updatePatchVersion: PropTypes.func
};

export default ModeratorPatchConfig;
