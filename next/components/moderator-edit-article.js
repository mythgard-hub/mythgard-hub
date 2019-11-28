import React from 'react';
import PropTypes from 'prop-types';

function ModeratorEditArticle({ article }) {
  return (
    <div>
      <label>
        Title: <input type="text" value={article.title} />
      </label>
      <label>
        Url: <input type="text" value={article.url} />
      </label>
      <label>
        Description: <input type="text" value={article.description} />
      </label>
      <label>
        Date: <input type="text" value={article.date} />
      </label>
      <label>
        Author: <input type="text" value={article.author} />
      </label>
    </div>
  );
}

ModeratorEditArticle.defaultProps = {};

ModeratorEditArticle.propTypes = {
  article: PropTypes.object
};

export default ModeratorEditArticle;
