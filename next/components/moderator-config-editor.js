import useConfig from '../lib/use-config.js';
import ModeratorEditArticle from '../components/moderator-edit-article.js';
import { useMutation } from '@apollo/react-hooks';
import gql from 'graphql-tag';

const configMutation = gql`
  mutation setConfig($newConfig: JSON!) {
    updateSiteConfig(input: { id: 1, patch: { config: $newConfig } }) {
      siteConfig {
        config
      }
    }
  }
`;

function ModeratorConfigEditor() {
  const { config, error, loading } = useConfig();

  if (error) {
    return 'error loading config';
  }

  if (loading) {
    return 'loading config';
  }

  const [updateConfig] = useMutation(configMutation, {
    update() {
      window.location.reload();
    },
    onError() {
      alert('That failed. Please check values and try again');
    }
  });

  const setArticle = article => console.log('article: ', article);

  const topMediaInputs = config.topMedia.map((media, i) => (
    <div key={i}>
      <ModeratorEditArticle
        article={media}
        setArticle={setArticle}
      ></ModeratorEditArticle>
      <hr />
    </div>
  ));

  return (
    <>
      <h2>Edit Site Media</h2>
      <h3>First Four Are Top Media</h3>
      {topMediaInputs}
    </>
  );
}

// ModeratorConfigEditor.propTypes = {
//   modUser: PropTypes.object
// };

export default ModeratorConfigEditor;
