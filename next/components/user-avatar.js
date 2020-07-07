import PropTypes from 'prop-types';

const cdn = process.env.MG_CDN;

export default function UserAvatar({ profileIconId, small = false }) {
  const avatarId = profileIconId || 1;
  const safeAvatarId = Math.ceil(Math.floor(avatarId, 62));
  const className = `profile-image ${small && 'small'}`;

  return (
    <>
      <style jsx>{`
        .profile-image {
          width: 138px;
          margin-top: 30px;
        }
        .small {
          width: 65px;
          margin-top: 0;
        }
      `}</style>
      <img
        data-cy="userAvatar"
        src={`${cdn}/avatars/avatar-${safeAvatarId}.png`}
        alt="Profile Icon"
        className={className}
      />
    </>
  );
}

UserAvatar.propTypes = {
  profileIconId: PropTypes.number,
  small: PropTypes.bool
};
