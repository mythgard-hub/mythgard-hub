import App, { Container } from 'next/app';
import Head from 'next/head';
import React from 'react';
import withApolloClient from '../components/with-apollo-client';
import { ApolloProvider } from 'react-apollo';
import Layout from '../components/layout';

class MyApp extends App {
  render() {
    const { Component, pageProps, apolloClient } = this.props;
    return (
      <Container>
        <ApolloProvider client={apolloClient}>
          <Head>
            <meta charset="utf-8" />
            <title>Mythgard Hub</title>
            <meta
              name="description"
              content="Your hub for Mythgard decks, cards, tournaments, and articles"
            />
            <meta
              name="viewport"
              content="width=device-width, initial-scale=1"
            />
          </Head>
          <Layout>
            <Component {...pageProps} />
          </Layout>
        </ApolloProvider>
      </Container>
    );
  }
}

export default withApolloClient(MyApp);
