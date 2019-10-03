import WelcomeBanner from './welcome-banner';
import Header from './header';
import Head from 'next/head';
import PropTypes from 'prop-types';
import { useContext } from 'react';
import { ThemeContext } from './theme-context';
import Footer from './footer';

const tabletMaxWidth = 925;

function Layout({ title, desc, children }) {
  const theme = useContext(ThemeContext);
  return (
    <>
      <WelcomeBanner />
      <div className="container">
        <style jsx>{`
          .container {
            padding: 0 43px;
            border-left: ${theme.border};
            border-right: ${theme.border};
            font-family: ${theme.fontFamily};
            max-width: 960px;
            margin: auto;
            min-height: 100%;
            background: ${theme.background};
          }

          @media only screen and (min-width: 600px) {
            .container:before {
              content: '';
              position: fixed;
              z-index: -1;
              top: 0;
              left: 0;
              width: calc((100% - 960px) / 2);
              max-width: 432px;
              min-width: 180px;
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
              max-width: 432px;
              min-width: 180px;
              height: 100%;
              background: url(${process.env.MG_CDN}/backgrounds/BG-RightSide.png);
              background-size: cover;
            }
          }

          @media only screen and (max-width: 600px) {
            .container {
              padding: 0 20px;
              border-left: none;
              border-right: none;
            }
          }

          @media only screen and (min-width: ${tabletMaxWidth + 1}px) {
            :global(.hideOnNotTablet) {
              display: none;
            }
          }

          @media only screen and (max-width: ${tabletMaxWidth}px) {
            :global(.hideOnTablet) {
              display: none;
            }
          }
        `}</style>
        <Head>
          <title>{title}</title>
          <meta name="description" key="desc" content={desc} />
          <link
            href="https://fonts.googleapis.com/css?family=Exo+2:300,300i,400,400i,600,600i,700,700i&display=swap"
            rel="stylesheet"
          />
        </Head>
        <Header />
        {children}
        <style jsx global>{`
          html,
          body,
          #__next {
            height: 97%;
            box-sizing: border-box;
          }

          body {
            background: ${theme.background};
            color: ${theme.fontColor};
            padding: 0;
            margin: 0;
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

          button:disabled {
            color: ${theme.fontColorDisabled};
            border: ${theme.buttonBorderDisabled};
          }

          button:hover {
            color: ${theme.hoverColor};
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
            padding-right: 20px;
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

          @media only screen and (max-width: 600px) {
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
  desc: 'Your hub for Mythgard decks, cards, tournaments, and articles'
};

Layout.propTypes = {
  title: PropTypes.string,
  desc: PropTypes.string,
  children: PropTypes.any
};

export default Layout;
