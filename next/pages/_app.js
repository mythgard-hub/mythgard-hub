import App, { Container } from 'next/app';
import Head from 'next/head';
import Router from 'next/router';
import withApolloClient from '../components/with-apollo-client';
import { ApolloProvider } from 'react-apollo';
import { pageview } from '../lib/gtag';

if (process.env.NODE_ENV === 'production') {
  /**
   * Include GA pageview tracking in production
   *
   * If you change the environment check here be sure to make corresponding
   * updates to the _document template.
   */
  Router.events.on('routeChangeComplete', url => pageview(url));
}

class MyApp extends App {
  render() {
    const { Component, pageProps, apolloClient } = this.props;
    return (
      <Container>
        <ApolloProvider client={apolloClient}>
          <Head>
            <meta charset="utf-8" />
            <meta
              name="viewport"
              key="viewport"
              content="width=device-width, initial-scale=1"
            />
          </Head>
          <Component {...pageProps} />
        </ApolloProvider>
      </Container>
    );
  }
}

export default withApolloClient(MyApp);
