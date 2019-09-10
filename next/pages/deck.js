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

  if (error) {
    pageElement = <ErrorMessage message={error.message} />;
  } else if (data && data.deck) {
    pageElement = <Deck deck={data.deck} />;
  } else {
    pageElement = <ErrorMessage message={'Deck does not exist!'} />;
  }

  return <Layout>{pageElement}</Layout>;
});
