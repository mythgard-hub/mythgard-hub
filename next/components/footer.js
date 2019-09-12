import { useContext } from 'react';
import { ThemeContext } from './theme-context';

// TODO - this is actually an essence indicator
export default function Footer() {
  const theme = useContext(ThemeContext);

  return (
    <div className="footer">
      <style jsx>{`
        .footer {
          background-color: ${theme.footerBackgroundColor};
          font-size: 11px;
          text-align: center;
          padding: 24px;
          width: 100%;
          font-family: ${theme.fontFamily};
        }

        a {
          text-decoration: none;
          color: ${theme.footerLinkColor};
        }
      `}</style>
      &copy; {new Date().getFullYear()} Mythgard |{' '}
      <a href={`mailto:${process.env.EMAIL_MG_SUPPORT}`}>Contact</a> |{' '}
      <a href="/privacy-policy">Privacy Policy</a>
    </div>
  );
}
