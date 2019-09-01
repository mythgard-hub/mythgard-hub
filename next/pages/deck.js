import { withRouter } from 'next/router';
import { useQuery } from 'react-apollo-hooks';
import ErrorMessage from '../components/error-message';
import Deck from '../components/deck';
import Layout from '../components/layout';
import { singleDeckQuery } from '../lib/deck-queries';

export default withRouter(({ router }) => {
  const { error, data } = useQuery(singleDeckQuery, {
    variables: { id: parseInt(router.query.id, 10) }
  });

  let pageElement = null;

  if (error) pageElement = <ErrorMessage message={`Error: ${error}`} />;

  if (data) pageElement = <Deck deck={data.deck} />;

  return <Layout>{pageElement}</Layout>;
});
