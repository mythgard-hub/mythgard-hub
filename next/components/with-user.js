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
      const user = ctx.req && ctx.req.user ? ctx.req.user : cachedUser;
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
