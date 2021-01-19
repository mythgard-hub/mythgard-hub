import { useMutation } from '@apollo/client';
import gql from 'graphql-tag';
import { configQuery } from './use-config.js';

const configMutation = gql`
  mutation setConfig($config: JSON!) {
    updateSiteConfig(input: { id: 1, patch: { config: $config } }) {
      siteConfig {
        config
      }
    }
  }
`;

export default function UseConfigMutation() {
  const [updateConfig] = useMutation(configMutation, {
    onError() {
      alert('That failed. Please check values and try again');
    },
    refetchQueries: [{ query: configQuery }]
  });

  const updateConfigWithObject = newConfigObject => {
    return updateConfig({
      variables: { config: JSON.stringify(newConfigObject) }
    });
  };

  return updateConfigWithObject;
}
