import App, { Container } from 'next/app';
import Head from 'next/head';
import Router from 'next/router';
import withApolloClient from '../components/with-apollo-client';
import { ApolloProvider } from 'react-apollo';
import { pageview, USE_GOOGLE_ANALYTICS } from '../lib/gtag';

const cdn = process.env.MG_CDN;

if (USE_GOOGLE_ANALYTICS) {
  Router.events.on('routeChangeComplete', url => pageview(url));
}

class MyApp extends App {
  render() {
    const { Component, pageProps, apolloClient } = this.props;
    return (
      <Container>
        <ApolloProvider client={apolloClient}>
          <Head>
            <meta charSet="utf-8" />
            <meta
              name="viewport"
              key="viewport"
              content="width=device-width, initial-scale=1"
            />

            <meta
              property="og:title"
              content="Mythgard Hub | Community Hub for Mythgard Card Game"
            />
            <meta property="og:site_name" content="Mythgard Hub" />
            <meta
              property="og:description"
              content="A fan-built site for Mythgard including Decklists, Card Database and more."
            />
            <meta property="og:url" content="https://mythgardhub.com/" />
            <meta property="og:type" content="article" />
            <meta property="og:image" content={`${cdn}/mgh/og-image.jpg`} />
            <meta property="og:image:type" content="image/png" />
          </Head>
          <Component {...pageProps} />
        </ApolloProvider>
      </Container>
    );
  }
}

export default withApolloClient(MyApp);
