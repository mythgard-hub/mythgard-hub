import { query as usernameQuery } from '../../pages/account.js';
import gql from 'graphql-tag';

// prettier-ignore
const updateAccountUsername = gql`
  mutation UpdateAccountUsername($accountId: Int!, $username: String!) {
    updateAccount(
      input: {
        id: $accountId
        patch: {
          username: $username
        }
      }
    ) {
      account {
        id
        email
        username
      }
    }
  }
`;

const updateUsername = (apolloClient, accountId, username) => {
  return apolloClient.mutate({
    mutation: updateAccountUsername,
    refetchQueries: {
      usernameQuery
    },
    variables: {
      accountId,
      username
    }
  });
};

export default updateUsername;
