import PropTypes from 'prop-types';
import { ACCOUNT_BORDERS } from '../constants/account-types';

const cdn = process.env.MG_CDN;

export default function UserAvatar({
  profileIconId,
  accountType = 'BASIC',
  small = false
}) {
  const avatarId = profileIconId || 1;
  const safeAvatarId = Math.ceil(Math.floor(avatarId, 62));
  const containerClassNames = `container ${small ? 'small' : 'large'}`;
  const borderImage =
    (accountType && ACCOUNT_BORDERS[accountType]) || ACCOUNT_BORDERS['BASIC'];

  return (
    <div className={containerClassNames}>
      <style jsx>{`
        .container {
          position: relative;
          margin-top: 30px;
        }
        .large {
          width: 156px;
          height: 176px;
        }
        .small {
          margin-top: 0;
          width: 72px;
          height: 79px;
        }
        .image {
          position: absolute;
          z-index: 1;
          left: 0;
          width: 100%;
        }
        .image-large {
          width: 138px;
        }
        .image-small {
          width: 65px;
        }
        .border {
          position: absolute;
          z-index: 2;
        }
        .border-small {
          width: 70px;
          left: -3px;
          top: -3px;
        }
        .border-large {
          width: 156px;
          left: -7px;
          top: -8px;
        }
      `}</style>
      {borderImage && (
        <img
          data-cy="userBorder"
          src={`${cdn}/avatar-borders/${borderImage}`}
          className={`border ${small ? 'border-small' : 'border-large'}`}
        />
      )}
      <img
        data-cy="userAvatar"
        src={`${cdn}/avatars/avatar-${safeAvatarId}.png`}
        alt="Profile Icon"
        className={`image ${small ? 'image-small' : 'image-large'}`}
      />
    </div>
  );
}

UserAvatar.propTypes = {
  profileIconId: PropTypes.number,
  small: PropTypes.bool
};
