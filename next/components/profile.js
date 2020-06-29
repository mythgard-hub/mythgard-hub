const cdn = process.env.MG_CDN;
import PropTypes from 'prop-types';

export default function UserProfile({ user }) {
  return (
    <>
      <style jsx>{`
        .user-profile {
          text-align: center;
          width: 100%;
          border: 1px solid #458a9e;
          background-color: #1c2d35;
        }

        .profile-image {
          width: 138px;
          margin-top: 30px;
        }
        .user-name {
          color: #f1810b;
          font-size: 1.5em;
          font-style: italic;
          font-weight: 600;
        }
      `}</style>
      <div className="user-profile">
        <img
          src={`${cdn}/mgh/avatar2.png`}
          alt="Profile Icon"
          className="profile-image"
        />
        <div className="user-name">{user.username}</div>
      </div>
    </>
  );
}

UserProfile.propTypes = {
  user: PropTypes.shape({
    username: PropTypes.string
  })
};
