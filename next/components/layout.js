import WelcomeBanner from './welcome-banner';
import Header from './header';
import Head from 'next/head';
import PropTypes from 'prop-types';
import { useContext } from 'react';
import { ThemeContext } from './theme-context';
import Footer from './footer';
import { withRouter } from 'next/router';

const cdn = process.env.MG_CDN;

function Layout({ title, desc, image, router, children }) {
  const theme = useContext(ThemeContext);
  return (
    <>
      <Head>
        <link rel="icon" type="image/x-icon" href="/static/favicon.ico" />
        <meta charSet="utf-8" />
        <meta
          name="viewport"
          key="viewport"
          content="width=device-width, initial-scale=1"
        />
        <title>{title}</title>
        <meta name="description" key="desc" content={desc} />
        <meta key="og:title" property="og:title" content={title} />
        <meta
          key="og:site_name"
          property="og:site_name"
          content="Mythgard Hub"
        />
        <meta key="og:description" property="og:description" content={desc} />
        <meta
          key="og:url"
          property="og:url"
          content={`https://mythgardhub.com${router.asPath}`}
        />
        <meta key="og:type" property="og:type" content="article" />
        <meta key="og:image" property="og:image" content={image} />
        <meta
          key="og:image:type"
          property="og:image:type"
          content="image/png"
        />
        <link
          href="https://fonts.googleapis.com/css?family=Exo+2:300,300i,400,400i,600,600i,700,700i&display=swap"
          rel="stylesheet"
        />
      </Head>
      <WelcomeBanner />
      <div className="container">
        <style jsx>{`
          .container {
            padding: 0 ${theme.spacing}px;
            border-left: ${theme.border};
            border-right: ${theme.border};
            font-family: ${theme.fontFamily};
            max-width: 960px;
            margin: auto;
            min-height: calc(100vh - 87px);
            background: ${theme.background};
          }

          @media only screen and (min-width: 576px) {
            .container:before {
              content: '';
              position: fixed;
              z-index: -1;
              top: 0;
              left: 0;
              width: calc((100% - 960px) / 2);
              height: 100%;
              background-image: url(${process.env.MG_CDN}/backgrounds/BG-LeftSide.png);
              background-size: cover;
            }

            .container:after {
              content: '';
              position: fixed;
              z-index: -1;
              top: 0;
              right: 0;
              width: calc((100% - 960px) / 2);
              height: 100%;
              background: url(${process.env.MG_CDN}/backgrounds/BG-RightSide.png);
              background-size: cover;
            }
          }

          @media only screen and (max-width: 575.98px) {
            .container {
              padding: 0 ${theme.spacing / 2}px;
              border-left: none;
              border-right: none;
            }
          }

          @media only screen and (min-width: 992px) {
            :global(.hideOnNotTablet) {
              display: none;
            }
          }

          @media only screen and (max-width: 991.98px) {
            :global(.hideOnTablet) {
              display: none;
            }
          }
        `}</style>
        <Header />
        {children}
        <style jsx global>{`
          html,
          body,
          #__next {
            box-sizing: border-box;
          }

          body {
            background: ${theme.background};
            color: ${theme.fontColor};
            padding: 0;
            margin: 0;
          }
          #__next {
            overflow: hidden;
          }

          p {
            margin-bottom: 10px;
            line-height: 1.3em;
            font-family: 'Exo 2', sans-serif;
            font-weight: 300;
          }

          h1 {
            color: ${theme.fontColorHeading};
            font-size: 1.8em;
            text-transform: uppercase;
            margin-top: 10px;
            margin-bottom: 10px;
          }

          h2 {
            margin-top: 7px;
            margin-bottom: 10px;
          }

          h3 {
            margin-top: 10px;
            font-weight: 600;
            margin-bottom: 7px;
          }

          h4 {
            font-weight: 600;
            margin-bottom: 7px;
          }

          a {
            color: ${theme.fontColor};
          }

          a:hover {
            color: ${theme.fontColorSelected};
          }

          .accent {
            color: ${theme.fontColorAccent};
            text-decoration: none;
          }

          .subtle {
            color: ${theme.fontColorSubtle};
            text-decoration: none;
          }

          .bold {
            font-weight: bold;
          }

          hr {
            border: none;
            border-top: ${theme.border};
          }

          hr.bgrad {
            border-top: ${theme.borderAccent};
            -webkit-mask-image: -webkit-gradient(
              linear,
              left top,
              right bottom,
              from(rgba(0, 0, 0, 0)),
              to(rgba(0, 0, 0, 1))
            );
          }

          hr.orangeGrade {
            margin-top: 10px;
            margin-bottom: 12px;
            border: 0;
            height: 1px;
            background-image: linear-gradient(
              to right,
              rgba(241, 129, 11, 0),
              rgba(241, 129, 11, 1),
              rgba(241, 129, 11, 0)
            );
          }

          button,
          input[type='submit'],
          a.button {
            background-color: ${theme.sectionBackground};
            border: ${theme.sectionBorder};
            color: ${theme.buttonTextColor};
            font-family: ${theme.fontFamily};
            font-size: 14px;
            font-weight: bold;
            text-transform: uppercase;
            padding: 10px 10px;
            width: 100%;
            border-radius: 10px;
            font-style: italic;
            cursor: pointer;
            text-decoration: none;
            display: inline-block;
            text-align: center;
          }

          a.button:hover,
          a.button:focus {
            color: ${theme.hoverColor};
          }

          button:disabled {
            color: ${theme.fontColorDisabled};
            border: ${theme.buttonBorderDisabled};
          }

          button:hover {
            color: ${theme.hoverColor};
          }

          button:disabled:hover {
            color: ${theme.fontColorDisabled};
            cursor: initial;
          }

          input[type='text'],
          select,
          textarea {
            border: ${theme.inputBorder};
            background-color: ${theme.inputBackground};
            border-radius: 7px;
            opacity: 1;
            font-family: ${theme.fontFamily};
            padding-left: 10px;
          }

          textarea {
            padding-top: 5px;
          }

          input[type='text'],
          select {
            height: 30px;
          }

          ::placeholder {
            color: ${theme.inputPlaceholderTextColor};
            opacity: 1;
            font-style: italic;
            font-family: ${theme.fontFamily};
          }

          .deck-card-table-container {
            background-color: ${theme.sectionBackground};
            border: ${theme.sectionBorder};
            border-radius: 10px;
          }

          .input-label {
            text-transform: uppercase;
            padding-right: ${theme.spacing}px;
            font-weight: bold;
          }

          .gradient-hr {
            margin-bottom: 10px;
            margin-left: 0;
            width: 95%;
            border: 0;
            height: 1px;
            background-image: linear-gradient(
              to right,
              ${theme.hrColorGradientLight},
              ${theme.hrColorGradientLight},
              ${theme.hrColorGradientDark}
            );
          }

          .article_title {
            color: ${theme.fontColorHeading};
            font-size: 2.7em;
            font-weight: 700;
            text-transform: uppercase;
          }

          .toc_column {
            margin: auto;
          }

          table.toc {
            width: 100%;
            margin-top: 25px;
          }

          table.toc td {
            vertical-align: top;
          }

          .articles_column {
            width: 77%;
            border: solid 0px white;
            margin: auto;
          }

          img.article {
            width: 90%;
            display: block;
            margin-left: auto;
            margin-right: auto;
            margin-top: 15px;
            margin-bottom: 5px;
          }

          .article_caption {
            display: block;
            text-align: center;
            margin-bottom: 25px;
          }

          .call-to-action-chevron:before {
            text-decoration: none;
            content: '\u25b6';
            margin-right: 3px;
            font-size: 10px;
          }

          .external-link::after {
            background-image: url('https://cdn.mythgardhub.com/icons/newWindow.svg');
            background-size: 12px 12px;
            display: inline-block;
            width: 12px;
            height: 12px;
            margin-left: 5px;
            content: '';
          }

          @media only screen and (max-width: 575.98px) {
            input[type='text'],
            select {
              height: 40px;
            }
          }
        `}</style>
        <style jsx global>{`
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
      <Footer />
    </>
  );
}

Layout.defaultProps = {
  title: 'Mythgard Hub',
  desc: 'Your hub for Mythgard decks, cards, tournaments, and media',
  image: `${cdn}/mgh/og-image.jpg`
};

Layout.propTypes = {
  title: PropTypes.string,
  desc: PropTypes.string,
  image: PropTypes.string,
  router: PropTypes.any,
  children: PropTypes.any
};

export default withRouter(Layout);
