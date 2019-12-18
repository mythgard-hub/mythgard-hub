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

        .welcome-message {
          color: ${theme.background};
          font-weight: 600;
          margin-left: 20px;
        }

        .spacer {
          flex-grow: 1;
        }

        @media only screen and (max-width: 600px) {
          .welcome-banner {
            min-width: 100%;
          }

          .welcome-message {
            display: none;
          }
        }
      `}</style>

      <a
        className="welcome-banner-link call-to-action-chevron"
        href={`mailto:${process.env.EMAIL_MG_CONTACT}`}
      >
        Contact
      </a>
      <span className="welcome-message">
        Welcome to the Mythgard Hub Beta Launch - NEW: Add descriptions and
        types to your decks!
      </span>

      <span className="spacer"></span>

      {!user && (
        <a
          href="/auth/google"
          className="welcome-banner-link call-to-action-chevron"
        >
          Login/Register
        </a>
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
