import { useContext, useEffect, useState } from 'react';
import { withRouter } from 'next/router';
import Layout from '../components/layout';
import UserContext from '../components/user-context';
import { ApolloConsumer } from 'react-apollo';
import updateUsername from '../lib/mutations/update-username';
import UserDecks from '../components/user-decks';
import PublicAccount from '../components/public-account.js';

import Router from 'next/router';
const cdn = process.env.MG_CDN;
const error403 = () => Router.push('/');

export default withRouter(({ router }) => {
  const un = router.query.id;
  if (un) {
    return <PublicAccount username={un} />;
  }

  const { user, updateUser } = useContext(UserContext);

  let result = null;

  useEffect(() => {
    if (!user) {
      error403();
      return;
    }
  });

  if (!user) {
    return <Layout>{result}</Layout>;
  }

  const [username, setUsername] = useState(user.username);

  const areSettingsValid = () => !!username;

  const handleSubmit = apolloClient => {
    if (!areSettingsValid()) return;
    updateUsername(apolloClient, user.id, username)
      .then(({ data }) => {
        updateUser(data.updateAccount.account);
      })
      .catch(err => {
        // TODO alert special msg if username not unique (or just suggest
        // a different one regardless of error).
        console.error('Something went wrong while updating user name', err);
      });
  };

  const regDate = new Date(user.registered);
  const regDateString = regDate.toLocaleDateString('en-us', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });

  return (
    <>
      <style jsx>{`
        .user-profile {
          text-align: center;
          width: 100%;
          border: 1px solid #458a9e;
          background-color: #1c2d35;
        }

        .profile-image {
          width: 138px;
          margin-top: 30px;
        }

        .user-name {
          color: #f1810b;
          font-size: 1.5em;
          font-style: italic;
          font-weight: 600;
        }

        .member-since {
          font-style: italic;
          font-weight: 300;
        }

        .profile-content {
          display: flex;
          flex-wrap: wrap;
          margin-bottom: 20px;
        }

        .profile-column {
          flex: 1;
        }

        h2.column-label {
          font-size: 1.2em;
          font-weight: 700;
          color: #ffffff;
          font-style: italic;
          text-align: center;
        }

        hr.ograd {
          margin-top: 10px;
          margin-bottom: 12px;
          margin-left: auto;
          margin-right: auto;
          width: 90%;
          border: 0;
          height: 1px;
          background-image: linear-gradient(
            to right,
            #11222a,
            #f1810b,
            #11222a
          );
        }
      `}</style>
      <Layout
        title="Mythgard Hub | Account Settings"
        desc="Account settings for Mythgard Hub"
      >
        <div className="user-profile">
          <img
            src={`${cdn}/mgh/avatar2.png`}
            alt="Profile Icon"
            className="profile-image"
          />
          <div className="user-name">{user.username}</div>
          <div className="member-since">Member since {regDateString}</div>
          <br />
          <br />
          <div className="profile-content">
            <div className="profile-column">
              <h2>My Decks</h2>
              <hr className="ograd" />
              <UserDecks userId={user.id} limit={3} />
            </div>
            <div className="profile-column">
              <h2>Profile</h2>
              <hr className="ograd" />
              <div className="stack">
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
            </div>
          </div>
        </div>
      </Layout>
    </>
  );
});
