import App, { Container } from 'next/app';
import React from 'react';
import Head from 'next/head';
import Router from 'next/router';
import withApolloClient from '../components/with-apollo-client';
import { ApolloProvider } from 'react-apollo';
import { ApolloProvider as HooksApolloProvider } from 'react-apollo-hooks';
import { pageview, USE_GOOGLE_ANALYTICS } from '../lib/gtag';
import UserContext from '../components/user-context';
import redirect from '../lib/redirect';

const cdn = process.env.MG_CDN;

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
    const { Component, apolloClient, apolloState, ...pageProps } = this.props;
    const { user } = this.state;
    return (
      <Container>
        <ApolloProvider client={apolloClient}>
          <HooksApolloProvider client={apolloClient}>
            <Head>
              <link rel="icon" type="image/x-icon" href="/static/favicon.ico" />
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
                content="A fan-built site for Mythgard including decklists, a card database and more."
              />
              <meta property="og:url" content="https://mythgardhub.com/" />
              <meta property="og:type" content="article" />
              <meta property="og:image" content={`${cdn}/mgh/og-image.jpg`} />
              <meta property="og:image:type" content="image/png" />
            </Head>
            <UserContext.Provider value={{ user, updateUser: this.updateUser }}>
              <Component {...pageProps} />
            </UserContext.Provider>
          </HooksApolloProvider>
        </ApolloProvider>
      </Container>
    );
  }
}

export default withApolloClient(MyApp);
