import Header from './header';
import Head from 'next/head';
import PropTypes from 'prop-types';
import React from 'react';
import { ThemeContext } from './theme-context';

class Layout extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    let theme = this.context;
    return (
      <div>
        <style jsx>{`
          padding: 0 50px 100px 50px;
          border: ${theme.border};
          font-family: ${theme.fontFamily};
          max-width: 1040px;
          margin: auto;
        `}</style>
        <Head>
          <title>{this.props.title}</title>
          <meta name="description" key="desc" content={this.props.desc} />
          <link
            href="https://fonts.googleapis.com/css?family=Exo+2&display=swap"
            rel="stylesheet"
          />
        </Head>
        <Header />
        {this.props.children}
        <style jsx global>{`
          body {
            background: ${theme.background};
            color: ${theme.fontColor};
            padding: 0;
            margin: 0;
          }

          a {
            color: ${theme.fontColor};
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
        `}</style>
      </div>
    );
  }
}

Layout.contextType = ThemeContext;

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
