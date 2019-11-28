import App from 'next/app';
import React from 'react';
import Router from 'next/router';
import withApolloClient from '../components/with-apollo-client';
import { ApolloProvider as ApolloHooksProvider } from '@apollo/react-hooks';
import { ApolloProvider } from 'react-apollo';
import { pageview, USE_GOOGLE_ANALYTICS } from '../lib/gtag';
import UserContext from '../components/user-context';
import ConfigContext from '../components/config-context.js';
import redirect from '../lib/redirect';

if (USE_GOOGLE_ANALYTICS) {
  Router.events.on('routeChangeComplete', url => pageview(url));
}

const SITE_CONFIG_QUERY =
  '{"query":"query config {\\n  siteConfig(id: 1){\\n    config\\n  }\\n}\\n\\t","variables":null,"operationName":"config"}';

const CONFIG_POST_OPTIONS = {
  method: 'post',
  body: SITE_CONFIG_QUERY,
  headers: {
    'Content-Type': 'application/json'
  }
};

const deserializeConfig = data => {
  return (
    (data &&
      data.data &&
      data.data.siteConfig &&
      data.data.siteConfig.config) ||
    {}
  );
};

class MyApp extends App {
  static async getInitialProps({ ctx, Component }) {
    let user, config;

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

      const API_HOST = process.env.API_HOST;
      const configResp = await fetch(
        `${API_HOST}/graphql`,
        CONFIG_POST_OPTIONS
      );

      config = await configResp.json();
    } else {
      const resp = await fetch('/auth/user');
      user = await resp.json();

      const configResp = await fetch('/graphql', CONFIG_POST_OPTIONS);

      config = await configResp.json();
    }
    if (!user && Component.requiresAuth) {
      redirect(ctx, '/');
    }

    console.log('config: ', deserializeConfig(config));

    return {
      ...pageProps,
      user,
      config: deserializeConfig(config)
    };
  }

  constructor(props) {
    super(props);

    this.state = {
      user: props.user,
      config: props.config
    };
  }

  updateUser = user => {
    this.setState({ user });
  };

  updateConfig = config => {
    this.setState({ config });
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
    const { user, config } = this.state;
    return (
      <ApolloHooksProvider client={apolloClient}>
        <ApolloProvider client={apolloClient}>
          <ConfigContext.Provider
            value={{ config, updateConfig: this.updateConfig }}
          >
            <UserContext.Provider value={{ user, updateUser: this.updateUser }}>
              <Component {...pageProps} />
            </UserContext.Provider>
          </ConfigContext.Provider>
        </ApolloProvider>
      </ApolloHooksProvider>
    );
  }
}

export default withApolloClient(MyApp);
