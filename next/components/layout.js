import Header from './header';
import Head from 'next/head';
import PropTypes from 'prop-types';
import { useContext } from 'react';
import { ThemeContext } from './theme-context';

function Layout({ title, desc, children }) {
  const theme = useContext(ThemeContext);
  return (
    <div>
      <style jsx>{`
        padding: 0 43px 100px 43px;
        border: ${theme.border};
        font-family: ${theme.fontFamily};
        max-width: 960px;
        margin: auto;
      `}</style>
      <Head>
        <title>{title}</title>
        <meta name="description" key="desc" content={desc} />
        <link
          href="https://fonts.googleapis.com/css?family=Exo+2:400,700&display=swap"
          rel="stylesheet"
        />
      </Head>
      <Header />
      {children}
      <style jsx global>{`
        body {
          background: ${theme.background};
          color: ${theme.fontColor};
          padding: 0;
          margin: 0;
        }

        a {
          color: ${theme.fontColorAccent};
          text-decoration: none;
        }

        hr {
          border: none;
          border-top: ${theme.border};
        }

        button,
        input[type='submit'] {
          background-color: ${theme.sectionBackground};
          border: ${theme.sectionBorder};
          color: ${theme.fontColor};
          font-family: ${theme.fontFamily};
          font-size: 20px;
          padding: 5px 10px;
          width: 100%;
          border-radius: 10px;
        }

        .deck-card-table-container {
          background-color: ${theme.sectionBackground};
          border: ${theme.sectionBorder};
          border-radius: 10px;
        }

        button:disabled {
          color: ${theme.fontColorDisabled};
          border: ${theme.buttonBorderDisabled};
        }
      `}</style>
      <style jsx global>{`
        .header + * {
          margin-top: 90px;
        }

        * {
          box-sizing: border-box;
        }

        // Every Layout styles
        .stack {
          --space: 1.5rem;
        }

        .stack > * {
          margin-top: 0;
          margin-bottom: 0;
        }

        .stack > * + * {
          margin-top: var(--space);
        }

        .reset-button {
          border: none;
          margin: 0;
          padding: 0;
          width: auto;
          overflow: visible;

          background: transparent;

          color: inherit;
          font: inherit;

          line-height: normal;

          -webkit-font-smoothing: inherit;
          -moz-osx-font-smoothing: inherit;

          -webkit-appearance: none;
        }

        /* Remove excess padding and border in Firefox 4+ */
        .reset-button::-moz-focus-inner {
          border: 0;
          padding: 0;
        }
      `}</style>
    </div>
  );
}

Layout.defaultProps = {
  title: 'Mythgard Hub',
  desc: 'Your hub for Mythgard decks, cards, tournaments, and articles'
};

Layout.propTypes = {
  title: PropTypes.string,
  desc: PropTypes.string,
  children: PropTypes.any
};

export default Layout;
