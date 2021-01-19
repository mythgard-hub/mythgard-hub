import React, { useContext } from 'react';
import Link from 'next/link';
import { withRouter } from 'next/router';
import PropTypes from 'prop-types';
import { ThemeContext } from './theme-context';

function HeaderLink(props) {
  const { route, children, cyName, router } = props;
  const theme = useContext(ThemeContext);
  let selectedClassName = router && router.pathname === route ? 'selected' : '';

  return (
    <>
      <style jsx>{`
        a:before {
          text-decoration: none;
          content: '▶';
          margin-right: 5px;
          font-size: 14px;
        }

        a {
          text-transform: uppercase;
          text-decoration: none;
          margin-right: 22px;
          font-size: 16px;
          white-space: nowrap;
        }

        .selected {
          color: ${theme.selectedPageColor};
        }

        @media only screen and (max-width: 600px) {
          a {
            font-size: 20px;
            margin-bottom: 10px;
            display: inline-flex;
            text-align: center;
          }

          a:before {
            content: ' ';
            width: 0px;
            height: 0px;
            border-top: 8px solid transparent;
            border-bottom: 8px solid transparent;
            border-left: 13px solid ${theme.fontColor};
            margin: 5px;
          }
        }
      `}</style>
      <Link href={route}>
        <a className={selectedClassName} data-cy={cyName}>
          {children}
        </a>
      </Link>
    </>
  );
}

HeaderLink.propTypes = {
  route: PropTypes.string,
  cyName: PropTypes.string,
  children: PropTypes.string
};

export default withRouter(HeaderLink);
