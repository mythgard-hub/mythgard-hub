import useConfig from '../lib/use-config.js';
import ModeratorEditArticle from '../components/moderator-edit-article.js';

function ModeratorConfigEditor() {
  const { config, error, loading } = useConfig();

  if (error) {
    return 'error loading config';
  }

  if (loading) {
    return 'loading config';
  }

  console.log('config: ', config);

  const topMediaInputs = config.topMedia.map((media, i) => (
    <div key={i}>
      <ModeratorEditArticle article={media}></ModeratorEditArticle>
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
