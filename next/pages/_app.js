import App from 'next/app';
import React from 'react';
import Router from 'next/router';
import withApolloClient from '../components/with-apollo-client';
import { ApolloProvider as ApolloHooksProvider } from '@apollo/react-hooks';
import { ApolloProvider } from 'react-apollo';
import { pageview, USE_GOOGLE_ANALYTICS } from '../lib/gtag';
import UserContext from '../components/user-context';
import redirect from '../lib/redirect';

if (USE_GOOGLE_ANALYTICS) {
  Router.events.on('routeChangeComplete', url => pageview(url));
}

class MyApp extends App {
  static async getInitialProps({ ctx, Component }) {
    let user;

    const pageProps = Component.getInitialProps
      ? await Component.getInitialProps(ctx)
      : {};

    if (ctx.req) {
      /**
       * In SSR mode we won't be able to rely on sending the cookie
       *
       * Be sure Webpack is instructed to not include isomorphic-unfetch in
       * bundles. Thre should be a "browser" section in our package.json.
       */
      const fetch = require('isomorphic-unfetch');
      const JWT_COOKIE_NAME = process.env.JWT_COOKIE_NAME;
      const SSR_HOST = process.env.SSR_HOST;
      const token = ctx.req.cookies[JWT_COOKIE_NAME];
      const resp = await fetch(`${SSR_HOST}/auth/user/${token}`);
      user = await resp.json();
    } else {
      const resp = await fetch('/auth/user');
      user = await resp.json();
    }
    if (!user && Component.requiresAuth) {
      redirect(ctx, '/');
    }

    return {
      ...pageProps,
      user
    };
  }

  constructor(props) {
    super(props);

    this.state = {
      user: props.user
    };
  }

  updateUser = user => {
    this.setState({ user });
  };

  componentDidMount() {
    // Don't bother with the interval if we're not signed in
    if (!this.state.user) return;
    this.userCheckInterval = setInterval(() => {
      if (!this.state.user) return;
      const r = new RegExp(`\\b${process.env.JWT_COOKIE_NAME}\\b`);
      if (!r.test(document.cookie)) {
        this.setState({ user: null });
      }
    }, 5000);
  }

  componentWillUnmount() {
    clearInterval(this.userCheckInterval);
  }

  render() {
    const { Component, apolloClient, ...pageProps } = this.props;
    const { user } = this.state;
    return (
      <ApolloHooksProvider client={apolloClient}>
        <ApolloProvider client={apolloClient}>
          <UserContext.Provider value={{ user, updateUser: this.updateUser }}>
            <Component {...pageProps} />
          </UserContext.Provider>
        </ApolloProvider>
      </ApolloHooksProvider>
    );
  }
}

export default withApolloClient(MyApp);
