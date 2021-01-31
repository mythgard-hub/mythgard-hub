import { useContext } from 'react';
import PropTypes from 'prop-types';
import { ThemeContext } from './theme-context';
import { mgColors } from '../lib/theme.js';
import Link from 'next/link';

export default function BigBanner({ children, href, src, mobileSrc }) {
  const theme = useContext(ThemeContext);
  return (
    <Link href={href}>
      <a className="bigBanner">
        <style jsx>{`
          .bigBanner {
            display: block;
            background: ${theme.background} url(${src}) no-repeat;
            height: 180px;
            display: flex;
            align-items: center;
            color: ${theme.background};
            font-size: 1.8em;
            font-weight: 700;
            justify-content: space-between;
            text-decoration: none;
            font-style: italic;
            background-size: cover;
          }
          .bigBanner .content {
            padding: 20px 0 20px 45px;
            display: flex;
            align-items: center;
            text-align: center;
          }
          .bigBanner:hover {
            color: ${mgColors.white};
          }
          .bigBanner .spacer1 {
            min-width: 463px;
            flex-grow: 0;
          }
          .bigBanner .spacer2 {
            flex-basis: 65px;
            flex-grow: 0;
          }
          @media only screen and (max-width: 720px) {
            .bigBanner {
              background: ${theme.background} url(${mobileSrc}) no-repeat;
              background-size: cover;
              color: ${mgColors.blue};
              flex-direction: column;
            }
            .bigBanner .content {
              padding: 10px 10px 10px 10px;
            }
            .bigBanner .spacer1 {
              min-height: 92px;
            }
            .bigBanner .spacer2 {
              display: none;
            }
          }
        `}</style>
        <span className="spacer1"></span>
        <span className="content">{children}</span>
        <span className="spacer2"></span>
      </a>
    </Link>
  );
}

BigBanner.propTypes = {
  children: PropTypes.any,
  src: PropTypes.string,
  mobileSrc: PropTypes.string,
  href: PropTypes.string
};
