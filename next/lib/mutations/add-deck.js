import gql from 'graphql-tag';

const addDeckMutation = gql`
  mutation AddDeck($name: String!) {
    createDeck(input: { deck: { name: $name } }) {
      deck {
        name
        id
      }
    }
  }
`;

const createDeckShell = (apolloClient, deckName) => {
  return apolloClient.mutate({
    mutation: addDeckMutation,
    variables: { name: deckName }
  });
};

export default createDeckShell;
