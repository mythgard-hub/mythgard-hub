import { useMutation } from '@apollo/react-hooks';
import gql from 'graphql-tag';

const accountMutation = gql`
  mutation updateAccount($email: String!, $accountType: Accounttype) {
    updateAccountByEmail(
      input: { email: $email, patch: { accountType: $accountType } }
    ) {
      account {
        id
        email
        accountType
      }
    }
  }
`;

export default function() {
  const [updateAccount] = useMutation(accountMutation, {
    update() {
      alert('The account was updated successfully');
      window.location.reload();
    },
    onError() {
      alert('That failed. Please check values and try again');
    }
  });

  return ({ email, accountType }) => {
    return updateAccount({
      variables: { email, accountType }
    });
  };
}
