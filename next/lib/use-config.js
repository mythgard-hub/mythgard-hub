import { useQuery } from '@apollo/react-hooks';
import gql from 'graphql-tag';

export default function() {
  const result = useQuery(gql`
    query config {
      siteConfig(id: 1) {
        config
      }
    }
  `);

  const { error, loading, data } = result;

  if (!(error || loading)) {
    try {
      result.config = JSON.parse(data.siteConfig.config);
    } catch (e) {
      result.error = 'Error deserializing config';
    }
  }

  return result;
}
