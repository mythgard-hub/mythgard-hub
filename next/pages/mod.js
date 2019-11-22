import { useContext, useEffect } from 'react';
import { useQuery } from '@apollo/react-hooks';
import Layout from '../components/layout';
import UserContext from '../components/user-context';
import ErrorMessage from '../components/error-message.js';
import ModeratorControlPanel from '../components/moderator-control-panel.js';
import Router from 'next/router';
import gql from 'graphql-tag';

const error403 = () => Router.push('/');

// Only users added to the account_moderators table can view use this page.
const ModeratorPage = () => {
  const { user } = useContext(UserContext);

  useEffect(() => {
    if (!user) {
      error403();
    }
  });

  const { loading, error, data } = useQuery(
    gql`
      query isModerator($accountId: Int!) {
        accountModerators(condition: { accountId: $accountId }) {
          totalCount
        }
      }
    `,
    {
      variables: {
        accountId: user && user.id
      }
    }
  );

  let result;

  if (loading) {
    result = 'loading';
  }

  if (error) {
    result = <ErrorMessage>error</ErrorMessage>;
  }

  result = '';

  if (data && data.accountModerators) {
    const isModerator = data.accountModerators.totalCount;
    if (isModerator) {
      result = (
        <div>
          <h1>Mythgard moderators</h1>
          <ModeratorControlPanel modUser={user} />
        </div>
      );
    } else {
      useEffect(() => {
        error403();
      });
    }
  }

  return <Layout>{result}</Layout>;
};

export default ModeratorPage;
