import React, { useContext, useEffect } from 'react';
import Link from 'next/link';
import { withRouter } from 'next/router';
import PropTypes from 'prop-types';
import { ThemeContext } from './theme-context';

function HeaderLink(props) {
  const { route, children, cyName, router } = props;
  const theme = useContext(ThemeContext);
  let selectedClassName = router.pathname === route ? 'selected' : '';

  return (
    <>
      <style jsx>{`
        a:before {
          text-decoration: none;
          content: '\u25b6';
          font-size: 80%;
          margin-right: 5px;
        }

        a {
          text-transform: uppercase;
          text-decoration: none;
          margin-right: 15px;
        }

        .selected {
          color: ${theme.selectedPageColor};
        }

        @media only screen and (max-width: 600px) {
          a {
            font-size: 20px;
            margin-bottom: 10px;
            display: inline-flex;
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
