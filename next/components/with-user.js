/*
 * A HOC for providing user account info to a page.
 *
 * This will only work with pages. If you wrap a regular (non-page) component,
 * you will lose.
 */

import React from 'react';

let cachedUser;

export default WrappedPage => {
  return class extends React.Component {
    static displayName = 'withUser(WrappedPage)';

    static async getInitialProps(ctx) {
      const pageProps =
        WrappedPage.getInitialProps && (await WrappedPage.getInitialProps(ctx));
      const isSSR = !!ctx.req;
      let user;

      if (isSSR) {
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
      const { isSSR, ...props } = this.props;
      return <WrappedPage {...props} />;
    }
  };
};
