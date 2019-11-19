import { useContext, useEffect } from 'react';
import { useQuery } from '@apollo/react-hooks';
import Layout from '../components/layout';
import UserContext from '../components/user-context';
import Router from 'next/router';
import gql from 'graphql-tag';

const ModeratorPage = () => {
  const { user } = useContext(UserContext);

  useEffect(() => {
    if (!user) {
      Router.push('/error');
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
        accountId: user.id
      }
    }
  );

  let result;

  if (loading) {
    result = 'loading';
  }

  if (error) {
    result = 'error';
  }

  if (data && data.accountModerators && !data.accountModerators.totalCount) {
    Router.push('/error');
  }

  return (
    <Layout>
      <h1>Mythgard moderators</h1>
      {result}
    </Layout>
  );
};

export default ModeratorPage;
