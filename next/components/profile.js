import PropTypes from 'prop-types';
import { useContext } from 'react';
import { ThemeContext } from './theme-context';
import UserAvatar from './user-avatar';

const cdn = process.env.MG_CDN;

export default function UserProfile({ user }) {
  const theme = useContext(ThemeContext);

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
          display: flex;
          flex-direction: column;
          align-items: center;
        }
        .user-details {
          text-align: center;
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
        <UserAvatar
          profileIconId={user && user.profileIconId}
          accountType={user && user.accountType}
        />
        <div className="user-details">
          <div data-cy="profile-name" className="user-name">
            {user.username}
          </div>
          <div className="member-since">Member since {regDateString}</div>
          <div className="account-type">
            {user.accountType ? user.accountType : ''}
          </div>
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
