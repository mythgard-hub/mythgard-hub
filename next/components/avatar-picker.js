import React, { useState } from 'react';
// import { useContext } from 'react';
// import { ThemeContext } from './theme-context';
import PropTypes from 'prop-types';

const numAvatars = 62;
const getLink = id => `${cdn}/avatars/avatar-${id}.png`;
const cdn = process.env.MG_CDN;

const limits = {
  default: 31,
  common: 37,
  uncommon: 44,
  rare: 50,
  mythic: 62
};

export default function AvatarPicker({ onSave, accountType }) {
  // const theme = useContext(ThemeContext);
  const [newProfileId, setNewProfileId] = useState(-1);
  const avatarLinks = Array.from(Array(numAvatars)).map((key, index) =>
    getLink(index + 1)
  );

  const userLimit = limits[accountType.toLowerCase()];

  return (
    <div className="avatar-picker">
      <style jsx>{`
        .avatar-options {
          max-height: 424px;
          overflow-y: scroll;
        }
        img {
          cursor: pointer;
        }
        .selected-box {
          display: inline-flex;
          align-items: center;
          flex-direction: column;
          vertical-align: top;
          width: 146px;
        }
        .selected {
          height: 111px;
        }
        button {
          margin: 10px 0;
          width: auto;
        }
        .support {
          margin: 40px 0;
        }
      `}</style>
      <h3>My Avatar</h3>
      <div className="avatar-options">
        {avatarLinks.reduce((acc, url, i) => {
          if (i >= userLimit) {
            return acc;
          }
          const selected = i + 1 === newProfileId;
          let result = (
            <img
              className={selected ? 'selected' : ''}
              src={url}
              key={i + 1}
              alt={'icon ' + i}
              onClick={() => setNewProfileId(i + 1)}
            />
          );
          if (selected) {
            result = (
              <span className="selected-box" key={i + 1}>
                {result}
                <button onClick={() => onSave(newProfileId)}>Confirm</button>
              </span>
            );
          }
          acc.push(result);
          return acc;
        }, [])}
        <span></span>
      </div>
      {userLimit < numAvatars ? (
        <div className="support">
          Support Mythgard Hub on Patreon to unlock additional Avatars...
        </div>
      ) : (
        ''
      )}
    </div>
  );
}

AvatarPicker.propTypes = {
  onSave: PropTypes.func,
  accountType: PropTypes.string
};
