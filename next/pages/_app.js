import App, { Container } from 'next/app';
import Head from 'next/head';
import React from 'react';
import withApolloClient from '../components/with-apollo-client';
import { ApolloProvider } from 'react-apollo';

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
