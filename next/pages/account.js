import React from 'react';
import Layout from '../components/layout';
import UserContext from '../components/user-context';
import { ApolloConsumer } from 'react-apollo';
import updateUsername from '../lib/mutations/update-username';

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

  areSettingsValid = () => {
    return !!this.state.username;
  };

  handleSubmit = (apolloClient) => {
    if (!this.areSettingsValid()) return;
    const { user, updateUser } = this.context;
    const { username } = this.state;
    updateUsername(apolloClient, user.id, username).then(({ data }) => {
      updateUser(data.updateAccount.account);
    });
  };

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
          <ApolloConsumer>
            {client => (
              <button
                type="submit"
                value="Save"
                style={{ width: '25%' }}
                onClick={() => {
                  this.handleSubmit(client);
                }}
              >
                Save
              </button>
            )}
          </ApolloConsumer>
        </div>
      </Layout>
    );
  }
}

Account.contextType = UserContext;

export default Account;
