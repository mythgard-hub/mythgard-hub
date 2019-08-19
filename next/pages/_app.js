import App, { Container } from 'next/app';
import React from 'react';
import Head from 'next/head';
import Router from 'next/router';
import withApolloClient from '../components/with-apollo-client';
import { ApolloProvider } from 'react-apollo';
import { pageview, USE_GOOGLE_ANALYTICS } from '../lib/gtag';
import UserContext from '../components/user-context';

if (USE_GOOGLE_ANALYTICS) {
  Router.events.on('routeChangeComplete', url => pageview(url));
}

let cachedUser;

class MyApp extends App {
  static async getInitialProps({ Component, ctx }) {
    const isSSR = !!ctx.req;
    let user;
    let pageProps = {};

    if(Component.getInitialProps) {
      pageProps = await Component.getInitialProps(ctx);
    }

    if (isSSR) {
      /**
       * In SSR mode we won't be able to rely on sending the cookie
       *
       * Be sure Webpack is instructed to not include isomorphic-unfetch in
       * bundles. Thre should be a "browser" section in our package.json.
       */
      const fetch = require('isomorphic-unfetch');
      const { JWT_COOKIE_NAME, SSR_HOST } = process.env;
      const token = ctx.req.cookies[JWT_COOKIE_NAME];
      const resp = await fetch(`${SSR_HOST}/auth/user/${token}`);
      user = await resp.json();
    } else {
      const resp = await fetch('/auth/user');
      user = await resp.json();
    }

    return {
      ...pageProps,
      isSSR,
      user
    };
  }

  componentDidMount() {
    const { isSSR, user } = this.props;
    if (isSSR) {
      cachedUser = user;
    }
  }

  render() {
    const { Component, pageProps, apolloClient, user } = this.props;
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
          </Head>
          <UserContext.Provider value={{ user }}>
            <Component {...pageProps} />
          </UserContext.Provider>
        </ApolloProvider>
      </Container>
    );
  }
}

export default withApolloClient(MyApp);
