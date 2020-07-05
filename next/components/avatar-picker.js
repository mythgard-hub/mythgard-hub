import React, { useState } from 'react';
import { useContext } from 'react';
import { ThemeContext } from './theme-context';
import PropTypes from 'prop-types';

const numAvatars = 62;
const getLink = id => `${cdn}/avatars/avatar-${id}.png`;
const cdn = process.env.MG_CDN;

export default function AvatarPicker({ onSave }) {
  const theme = useContext(ThemeContext);
  const [newProfileId, setNewProfileId] = useState(-1);
  const avatarLinks = Array.from(Array(numAvatars)).map((key, index) =>
    getLink(index + 1)
  );

  return (
    <div className="avatar-picker">
      <style jsx>{`
        .avatar-options {
          max-height: 424px;
          overflow-y: scroll;
        }
        img {
          border: ${theme.borderHidden};
        }
        .selected {
          border: ${theme.border};
        }
        button {
          margin-top: 20px;
          width: auto;
        }
      `}</style>
      <h3>My Avatar</h3>
      <div className="avatar-options">
        {avatarLinks.map((url, i) => {
          return (
            <img
              className={i + 1 === newProfileId ? 'selected' : ''}
              src={url}
              key={url}
              alt={'icon ' + i}
              onClick={() => setNewProfileId(i + 1)}
            />
          );
        })}
      </div>
      <div>
        <button onClick={() => onSave(newProfileId)}>Save Avatar</button>
      </div>
    </div>
  );
}

AvatarPicker.propTypes = {
  onSave: PropTypes.func
};
