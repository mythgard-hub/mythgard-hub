import useConfig from '../lib/use-config.js';
import useConfigMutation from '../lib/use-config-mutation.js';
import ModeratorEditArticle from '../components/moderator-edit-article.js';

function ModeratorConfigEditor() {
  const { config, error, loading } = useConfig();
  const updateConfig = useConfigMutation();

  if (error) {
    return 'error loading config';
  }

  if (loading) {
    return 'loading config';
  }

  const setArticle = (i, article) => {
    config.topMedia[i] = article;
    updateConfig(config);
  };

  const topMediaInputs = config.topMedia.map((media, i) => (
    <div key={i}>
      <ModeratorEditArticle
        article={media}
        setArticle={article => setArticle(i, article)}
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
