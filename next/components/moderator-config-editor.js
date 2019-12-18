import useConfig from '../lib/use-config.js';
import useConfigMutation from '../lib/use-config-mutation.js';
import ModeratorEditArticle from '../components/moderator-edit-article.js';

function arrayMove(arr, fromIndex, toIndex) {
  const element = arr[fromIndex];
  arr.splice(fromIndex, 1);
  arr.splice(toIndex, 0, element);
}

function ModeratorConfigEditor() {
  const { config, error, loading } = useConfig();
  const updateConfig = useConfigMutation();

  if (error) {
    return 'error loading config';
  }

  if (loading) {
    return 'loading config';
  }

  const setArticle = (i, article, newIndex) => {
    config.topMedia[i] = article;
    if (i !== newIndex) {
      arrayMove(config.topMedia, i, newIndex);
    }
    updateConfig(config);
  };

  const addArticle = (newArticle, i) => {
    config.topMedia.unshift(newArticle);
    arrayMove(config.topMedia, 0, i);
    updateConfig(config);
  };

  const deleteArticle = i => {
    if (
      window.confirm(
        'Are you sure you want to permanently delete this media? There is no undo. Copy-pasting fields to a spreadsheet first is recommended.'
      )
    ) {
      config.topMedia.splice(i, 1);
      updateConfig(config);
    }
  };

  const topMediaEditForms = config.topMedia.map((media, i) => (
    <div key={i}>
      <ModeratorEditArticle
        article={media}
        i={i}
        setArticle={(article, newIndex) => setArticle(i, article, newIndex)}
        hasDelete={true}
        onDelete={() => deleteArticle(i)}
      ></ModeratorEditArticle>
      <hr />
    </div>
  ));

  return (
    <>
      <h2>Add New Media</h2>
      <div>
        <ModeratorEditArticle setArticle={addArticle}></ModeratorEditArticle>
        <hr />
      </div>
      <h2>Edit Site Media</h2>
      <h3>First Four Are Top Media</h3>
      {topMediaEditForms}
    </>
  );
}

export default ModeratorConfigEditor;
