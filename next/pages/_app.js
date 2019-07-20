import App, { Container } from 'next/app';
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
          <Layout>
            <Component {...pageProps} />
          </Layout>
        </ApolloProvider>
      </Container>
    );
  }
}

export default withApolloClient(MyApp);
