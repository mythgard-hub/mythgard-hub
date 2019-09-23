import { useContext } from 'react';
import { ThemeContext } from './theme-context';
import Link from 'next/link';

// TODO - this is actually an essence indicator
export default function Footer() {
  const theme = useContext(ThemeContext);

  return (
    <div className="footer">
      <style jsx>{`
        .footer {
          background-color: ${theme.footerBackgroundColor};
          color: ${theme.footerTextColor};
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

        * + *:before {
          content: '|';
          color: ${theme.footerTextColor};
          margin: 0 2px;
        }
      `}</style>
      <span>&copy; {new Date().getFullYear()} Mythgard Hub</span>
      <a href={process.env.DISCORD_INVITE_URL}>Discord</a>
      <a href={`mailto:${process.env.EMAIL_MG_CONTACT}`}>General Contact</a>
      <a href={`mailto:${process.env.EMAIL_MG_SUPPORT}`}>Support</a>
      <a href={`mailto:${process.env.EMAIL_MG_EVENTS}`}>List Your Event</a>
      <a href={`mailto:${process.env.EMAIL_MG_BUSINESS}`}>Business Inquiries</a>
      <Link href="/privacy-policy">
        <a>Privacy Policy</a>
      </Link>
    </div>
  );
}
