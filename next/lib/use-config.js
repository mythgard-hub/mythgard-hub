import { useQuery } from '@apollo/client';
import gql from 'graphql-tag';

export const configQuery = gql`
  query config {
    siteConfig(id: 1) {
      config
    }
  }
`;

export default function UseConfig() {
  const result = useQuery(configQuery);

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
