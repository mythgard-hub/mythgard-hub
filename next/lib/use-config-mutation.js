import { useMutation } from '@apollo/react-hooks';
import gql from 'graphql-tag';

const configMutation = gql`
  mutation setConfig($config: JSON!) {
    updateSiteConfig(input: { id: 1, patch: { config: $config } }) {
      siteConfig {
        config
      }
    }
  }
`;

export default function() {
  const [updateConfig] = useMutation(configMutation, {
    update() {
      window.location.reload();
    },
    onError() {
      alert('That failed. Please check values and try again');
    }
  });

  const updateConfigWithObject = newConfigObject => {
    return updateConfig({
      variables: { config: JSON.stringify(newConfigObject) }
    });
  };

  return updateConfigWithObject;
}
