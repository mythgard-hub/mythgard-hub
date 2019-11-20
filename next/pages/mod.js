import { useContext, useEffect } from 'react';
import { useQuery } from '@apollo/react-hooks';
import Layout from '../components/layout';
import UserContext from '../components/user-context';
import ErrorMessage from '../components/error-message.js';
import Router from 'next/router';
import gql from 'graphql-tag';

const error403 = () => Router.push('/error');

const userLoadedAndNotModerator = data => {
  const userLoaded = data && data.accountModerators;
  return userLoaded && !data.accountModerators.totalCount;
};

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

  if (userLoadedAndNotModerator(data)) {
    error403();
  }

  return (
    <Layout>
      <h1>Mythgard moderators</h1>
      {result}
    </Layout>
  );
};

export default ModeratorPage;
