import React from 'react';
import Layout from '../components/layout';
import UserContext from '../components/user-context';

class Account extends React.Component {
  constructor(props, context) {
    super(props, context);

    this.state = {
      username: context.user.username
    };
  }

  static get requiresAuth() {
    return true;
  }

  render() {
    const { user } = this.context;
    const { username } = this.state;
    return (
      <Layout
        title="Mythgard Hub | Account Settings"
        desc="The Mythgard Hub privacy policy"
      >
        <h1>My Profile</h1>

        <h2>Settings</h2>

        <div className="stack">
          <div>
            <label>Email: </label>
            <span>{user.email}</span>
          </div>
          <div>
            <label>User Name: </label>
            <input
              data-cy="deckTitle"
              type="text"
              name="deckName"
              onChange={e => {
                this.setState({ username: e.target.value });
              }}
              value={username}
            />
          </div>
        </div>
      </Layout>
    );
  }
}

Account.contextType = UserContext;

export default Account;
