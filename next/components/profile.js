import PropTypes from 'prop-types';
import { useContext } from 'react';
import { ThemeContext } from './theme-context';

const cdn = process.env.MG_CDN;

export default function UserProfile({ user }) {
  const theme = useContext(ThemeContext);
  const safeAvatarId = Math.ceil(Math.floor(Number(user.profileIconId), 0), 62);

  const regDate = new Date(user.registered);
  const regDateString = regDate.toLocaleDateString('en-us', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });

  return (
    <>
      <style jsx>{`
        .user-profile {
          text-align: center;
        }
        .profile-image {
          width: 138px;
          margin-top: 30px;
        }
        .user-name {
          color: ${theme.fontColorAccent};
          font-size: 1.5em;
          font-style: italic;
          font-weight: 600;
        }
        .member-since {
          font-style: italic;
          font-weight: 300;
        }
      `}</style>
      <div className="user-profile">
        <img
          src={`${cdn}/avatars/avatar-${safeAvatarId}.png`}
          alt="Profile Icon"
          className="profile-image"
        />
        <div data-cy="profile-name" className="user-name">
          {user.username}
        </div>
        <div className="member-since">Member since {regDateString}</div>
        <div className="account-type">
          {user.accountType ? user.accountType : ''}
        </div>
      </div>
    </>
  );
}

UserProfile.propTypes = {
  user: PropTypes.shape({
    username: PropTypes.string,
    registered: PropTypes.string,
    profileIconId: PropTypes.number,
    accountType: PropTypes.string
  })
};
