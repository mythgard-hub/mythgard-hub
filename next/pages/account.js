import React from 'react';
import Layout from '../components/layout';
import UserContext from '../components/user-context'

class Account extends React.Component {
  static get requiresAuth() {
    return true;
  }

  render() {
    const { user } = this.context;
    return (
      <Layout
        title="Mythgard Hub | Account Settings"
        desc="The Mythgard Hub privacy policy"
      >
        <h1>My Account</h1>
        {user && `Account Things for ${user.email}`}
      </Layout>
    );
  }
}

Account.contextType = UserContext

export default Account;
