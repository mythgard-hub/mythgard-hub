import { useContext, useState } from 'react';
import Layout from '../components/layout';
import UserContext from '../components/user-context';
import { ApolloConsumer } from 'react-apollo';
import updateUsername from '../lib/mutations/update-username';
import Link from 'next/link';

function Account() {
  const { user, updateUser } = useContext(UserContext);
  const [username, setUsername] = useState(user.username);

  const areSettingsValid = () => !!username;

  const handleSubmit = apolloClient => {
    if (!areSettingsValid()) return;
    updateUsername(apolloClient, user.id, username)
      .then(({ data }) => {
        updateUser(data.updateAccount.account);
      })
      .catch(err => {
        console.error('Something went wrong while updating user name', err);
      });
  };

  return (
    <Layout
      title="Mythgard Hub | Account Settings"
      desc="Account settings for Mythgard Hub"
    >
      <h1>My Profile</h1>

      <h2>Settings</h2>

      <div className="stack">
        <div>
          <Link href="/auth/logout">Log out</Link>
        </div>
        <div>
          <label>Email: </label>
          <span>{user.email}</span>
        </div>
        <div>
          <label>User Name: </label>
          <input
            data-cy="username"
            type="text"
            name="username"
            onChange={e => {
              setUsername(e.target.value);
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
                handleSubmit(client);
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

Account.requiresAuth = true;

export default Account;
