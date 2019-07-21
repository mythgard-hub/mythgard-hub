import Header from './header';
import Head from 'next/head';
import PropTypes from 'prop-types';

const layoutStyle = {
  margin: 20,
  padding: 20,
  border: '1px solid #DDD'
};

/* eslint-disable react/prop-types */
const Layout = props => (
  <div style={layoutStyle}>
    <Head>
      <title>{props.title}</title>
      <meta name="description" key="desc" content={props.desc} />
    </Head>
    <Header />
    {props.children}
    <style jsx global>{`
      .header + * {
        margin-top: 50px;
      }
    `}</style>
  </div>
);

Layout.defaultProps = {
  title: 'Mythgard Hub',
  desc: 'Your hub for Mythgard decks, cards, tournaments, and articles'
};

Layout.propTypes = {
  title: PropTypes.string,
  desc: PropTypes.string
}

export default Layout;
