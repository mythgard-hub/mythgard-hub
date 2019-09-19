import Link from 'next/link';
import { useContext } from 'react';
import UserContext from './user-context';
import { ThemeContext } from './theme-context';

export default function WelcomeBanner() {
  const { user } = useContext(UserContext);
  const theme = useContext(ThemeContext);
  return (
    <div className="welcome-banner">
      <style jsx>{`
        .welcome-banner {
          font-family: ${theme.fontFamily};
          font-size: 0.8em;
          height: 26px;
          min-width: 990px;
          max-width: 90%;
          margin: 0 auto;
          border-bottom-right-radius: 15px;
          border-bottom-left-radius: 15px;
          padding-right: 25px;
          padding-left: 25px;
          background-color: ${theme.welcomeBannerBackground};
          display: flex;
          align-items: center;
          justify-content: space-between;
        }

        .welcome-banner-link:before {
          content: '\u25b6';
          margin-right: 3px;
        }

        .welcome-banner-link-username:before {
          content: none;
        }

        .welcome-banner-link-username {
          margin-right: 15px;
        }

        .welcome-banner-link {
          text-decoration: none;
          font-weight: 600;
          color: ${theme.background};
        }

        .welcome-banner-link:hover,
        .welcome-banner-link:focus {
          color: ${theme.fontColor};
        }

        @media only screen and (max-width: 600px) {
          .welcome-banner {
            min-width: 100%;
          }
        }
      `}</style>

      <a
        className="welcome-banner-link"
        href={`mailto:${process.env.EMAIL_MG_SUPPORT}`}
      >
        Contact
      </a>

      {!user && (
        <Link href="/auth/google">
          <a className="welcome-banner-link">Login/Register</a>
        </Link>
      )}

      {user && (
        <div>
          <Link href="/account">
            <a className="welcome-banner-link welcome-banner-link-username">
              {user.username || 'Welcome'}
            </a>
          </Link>
          <a href="/auth/logout" className="welcome-banner-link">
            Logout
          </a>
        </div>
      )}
    </div>
  );
}
