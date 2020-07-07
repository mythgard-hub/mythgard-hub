import PropTypes from 'prop-types';
import { ACCOUNT_BORDER_COLORS } from '../constants/account-types';

const cdn = process.env.MG_CDN;

export default function UserAvatar({
  profileIconId,
  accountType = 'BASIC',
  small = false
}) {
  const avatarId = profileIconId || 1;
  const safeAvatarId = Math.ceil(Math.floor(avatarId, 62));
  const containerClassNames = `container ${small ? 'small' : ''}`;
  const borderColor = accountType && ACCOUNT_BORDER_COLORS[accountType];
  const backgroundClassName = [
    borderColor ? 'hexagon' : '',
    borderColor && (small ? 'hexagon-small' : 'hexagon-large')
  ];
  const width = small ? '65px' : '138px';
  const height = small ? '75px' : '159px';

  return (
    <div className={containerClassNames}>
      <style jsx>{`
        .container {
          position: relative;
          width: ${width};
          height: ${height};
          margin-top: 30px;
        }
        .small {
          margin-top: 0;
        }

        .hexagon {
          position: absolute;
          z-index: 1;
          background-color: ${borderColor};
        }
        .hexagon:before,
        .hexagon:after {
          content: '';
          position: absolute;
          left: 0;
          width: 0;
        }
        .hexagon:before {
          bottom: 100%;
          border-bottom-style: solid;
          border-bottom-color: ${borderColor};
        }
        .hexagon:after {
          top: 100%;
          width: 0;
          border-top-style: solid;
          border-top-color: ${borderColor};
        }

        .hexagon-large {
          right: -3.45px;
          top: -2.2px;
          width: 144px;
          height: 81.98px;
          margin: 40.99px 0;
        }
        .hexagon-large:before,
        .hexagon-large:after {
          border-left: 71px solid transparent;
          border-right: 71px solid transparent;
        }
        .hexagon-large:before {
          border-bottom-width: 40.99px;
        }
        .hexagon-large:after {
          border-top-width: 40.99px;
        }

        .hexagon-small {
          right: -2.3px;
          top: -2.2px;
          width: 69px;
          height: 40px;
          margin: 19.63px 0;
        }
        .hexagon-small:before,
        .hexagon-small:after {
          border-left: 34px solid transparent;
          border-right: 34px solid transparent;
        }
        .hexagon-small:before {
          border-bottom-width: 19.63px;
        }
        .hexagon-small:after {
          border-top-width: 19.63px;
        }

        .profile-image {
          position: absolute;
          z-index: 2;
          width: ${width};
        }

        .profile-image {
          left: 0;
        }
      `}</style>
      <img
        data-cy="userAvatar"
        src={`${cdn}/avatars/avatar-${safeAvatarId}.png`}
        alt="Profile Icon"
        className="profile-image"
      />
      {backgroundClassName && <div className={backgroundClassName} />}
    </div>
  );
}

UserAvatar.propTypes = {
  profileIconId: PropTypes.number,
  small: PropTypes.bool
};
