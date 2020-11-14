/*
 * A HOC for providing user account info to a component.
 * This consumes the user context in order to provide `user`
 * as an additional prop.
 */

import React from 'react';
import UserContext from './user-context';

const WithUser = WrappedComponent => {
  return class extends React.Component {
    static displayName = 'withUser(WrappedComponent)';

    static async getInitialProps(ctx) {
      const pageProps =
        WrappedComponent.getInitialProps &&
        (await WrappedComponent.getInitialProps(ctx));
      return { ...pageProps };
    }

    render() {
      return (
        <UserContext.Consumer>
          {({ user }) => {
            const newProps = { ...this.props, user };
            return <WrappedComponent {...newProps} />;
          }}
        </UserContext.Consumer>
      );
    }
  };
};

export default WithUser;
