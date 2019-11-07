import { useContext } from 'react';
import Link from 'next/link';
import { ThemeContext } from './theme-context';
import UserContext from '../components/user-context';

export default function DeckBuilderUser() {
  const theme = useContext(ThemeContext);
  const { user } = useContext(UserContext);

  const userElement = (
    <Link href={user ? '/account' : '/auth/google'}>
      <a data-cy="userLink" className="link">
        {user?.username || 'Guest'}
      </a>
    </Link>
  );

  return (
    <div className="deck-author">
      <style jsx>{`
        .deck-author {
          display: flex;
          justify-content: space-between;
          margin: 10px 0;
        }
        .login-link,
        .user-link {
          text-decoration: none;
          color: ${theme.fontColorAccent};
        }
        .login-link:before {
          text-decoration: none;
          content: '\u25b6';
          margin-right: 3px;
          font-size: 10px;
        }
        .login-link {
          font-size: 14px;
        }
      `}</style>
      <div>
        by{' '}
        <Link href={user ? '/account' : '/auth/google'}>
          <a data-cy="userLink" className="user-link">
            {user?.username || 'Guest'}
          </a>
        </Link>
      </div>
      {!user && (
        <Link href="/auth/google">
          <a data-cy="loginToSave" className="login-link">
            Login/Register
          </a>
        </Link>
      )}
    </div>
  );
}
