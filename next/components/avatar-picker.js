import React, { useState } from 'react';
const numAvatars = 62;

const getLink = id => `${cdn}/avatars/avatar-${id}.png`;

const cdn = process.env.MG_CDN;

export default function AvatarPicker() {
  const [newProfileId, setNewProfileId] = useState(-1);
  const avatarLinks = Array.from(Array(numAvatars)).map((key, index) =>
    getLink(index + 1)
  );
  return (
    <div>
      <style jsx>{`
        .selected {
          border: 1px solid red;
        }
      `}</style>
      {newProfileId}
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
  );
}
