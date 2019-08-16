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
          .header + * {
            margin-top: 90px;
          }

          * {
            box-sizing: border-box;
          }

          body {
            background: ${theme.background};
            color: ${theme.fontColor};
            padding: 0;
            margin: 0;
          }

          a {
            color: ${theme.fontColor};
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
