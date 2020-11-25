import { useContext, useEffect, useState } from 'react';
import { withRouter } from 'next/router';
import Layout from '../components/layout';
import UserContext from '../components/user-context';
import { ApolloConsumer } from 'react-apollo';
import updateUsername from '../lib/mutations/update-username';
import UserDecks from '../components/user-decks';
import PublicAccount from '../components/public-account.js';
import Profile from '../components/profile.js';
import AvatarPicker from '../components/avatar-picker.js';
import Router from 'next/router';
import { useMutation, useLazyQuery } from '@apollo/react-hooks';
import { query as usernameQuery } from '../components/public-account.js';
import gql from 'graphql-tag';

const error403 = () => Router.push('/');

const UN_DEBOUNCE_MS = 1000;

export default withRouter(({ router }) => {
  const un = router.query.name;
  if (un) {
    return <PublicAccount username={un} />;
  }

  const { user, updateUser } = useContext(UserContext);
  const [unDebounceTimer, setUnDebounceTimer] = useState(false);

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

  const [usernameUntrimmed, setUsername] = useState(user.username);
  const username = usernameUntrimmed.trim();
  const [lastSavedUsername, setLastSavedUsername] = useState(user.username);

  const [checkUserNameQuery, unQuery] = useLazyQuery(usernameQuery);

  const checking = unDebounceTimer || unQuery.loading;
  const usernameUnchanged = username != lastSavedUsername;
  const showResults = unQuery.called && !checking && usernameUnchanged;
  const lastQueryHadResult = unQuery.data && unQuery.data.accountByUsername;
  const usernameTaken = showResults && lastQueryHadResult;
  const usernameAvailable = username && showResults && !lastQueryHadResult;

  const areSettingsValid = () =>
    !!username && usernameAvailable && username != lastSavedUsername;

  const handleSubmit = apolloClient => {
    if (!areSettingsValid()) return;
    updateUsername(apolloClient, user.id, username)
      .then(({ data }) => {
        updateUser({ ...user, ...data.updateAccount.account });
        setLastSavedUsername(username);
      })
      .catch(err => {
        // TODO alert special msg if username not unique (or just suggest
        // a different one regardless of error).
        console.error('Something went wrong while updating user name', err);
      });
  };

  const checkUsername = un => {
    debounceUn(() => checkUsernameHelper(un));
  };

  const debounceUn = cb => {
    if (unDebounceTimer) {
      clearTimeout(unDebounceTimer);
    }
    setUnDebounceTimer(
      setTimeout(() => {
        cb();
        setUnDebounceTimer(false);
      }, UN_DEBOUNCE_MS)
    );
  };

  const checkUsernameHelper = username => {
    checkUserNameQuery({ variables: { username } });
  };

  const [patchAvatar] = useMutation(
    gql`
      mutation updateProfileIconId($accountId: Int!, $profileIconId: Int!) {
        updateAccount(
          input: { id: $accountId, patch: { profileIconId: $profileIconId } }
        ) {
          account {
            profileIconId
          }
        }
      }
    `,
    {
      update() {
        window.scrollTo(0, 0);
        // TODO - write to cache instead?
        window.location.reload();
      },
      onError() {
        alert('That failed. Please check values and try again');
      }
    }
  );

  const updateAvatar = profileIconId => {
    patchAvatar({
      variables: {
        accountId: user.id,
        profileIconId
      }
    });
  };

  return (
    <>
      <style jsx>{`
        .private-profile {
          text-align: center;
          width: 100%;
          border: 1px solid #458a9e;
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
        <div className="private-profile">
          <Profile user={user} />
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
                      checkUsername(e.target.value);
                      setUsername(e.target.value);
                    }}
                    value={username}
                  />
                  <br />
                  {checking && <span>Checking availability...</span>}
                  {usernameTaken && <span>Username is not available 🚫</span>}
                  {usernameAvailable && <span>Username available ✅</span>}
                </div>
                <ApolloConsumer>
                  {client => (
                    <button
                      type="submit"
                      value="Save"
                      disabled={!areSettingsValid()}
                      style={{ width: 'auto' }}
                      onClick={() => {
                        handleSubmit(client);
                      }}
                    >
                      Save Username
                    </button>
                  )}
                </ApolloConsumer>
                <div>
                  <AvatarPicker
                    onSave={profileIconId => updateAvatar(profileIconId)}
                    accountType={user.accountType}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </Layout>
    </>
  );
});
