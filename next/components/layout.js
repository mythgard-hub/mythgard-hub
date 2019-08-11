import Header from './header';
import Head from 'next/head';
import PropTypes from 'prop-types';
import React from 'react';

const layoutStyle = {
  margin: 20,
  padding: 20,
  border: '1px solid #DDD'
};

class Layout extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div style={layoutStyle}>
        <Head>
          <title>{this.props.title}</title>
          <meta name="description" key="desc" content={this.props.desc} />
        </Head>
        <Header />
        {this.props.children}
        <style jsx global>{`
          .header + * {
            margin-top: 50px;
          }
        `}</style>
      </div>
    );
  }
}

Layout.defaultProps = {
  title: 'Mythgard Hub',
  desc: 'Your hub for Mythgard decks, cards, tournaments, and articles'
};

Layout.propTypes = {
  title: PropTypes.string,
  desc: PropTypes.string,
  children: PropTypes.array
};

export default Layout;
