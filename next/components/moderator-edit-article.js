import React from 'react';
import PropTypes from 'prop-types';
import { useState } from 'react';
import { handleInputChangeHooks } from '../lib/form-utils.js';

function ModeratorEditArticle({ article, setArticle }) {
  const [title, setTitle] = useState(article.title);
  const onChangeTitle = handleInputChangeHooks(setTitle);
  const [url, setUrl] = useState(article.url);
  const onChangeUrl = handleInputChangeHooks(setUrl);
  const [desc, setDesc] = useState(article.description);
  const onChangeDesc = handleInputChangeHooks(setDesc);
  const [date, setDate] = useState(article.date);
  const onChangeDate = handleInputChangeHooks(setDate);
  const [author, setAuthor] = useState(article.author);
  const onChangeAuthor = handleInputChangeHooks(setAuthor);

  const onClick = () =>
    setArticle({
      title,
      url,
      description: desc,
      date,
      author
    });
  return (
    <div>
      <label>
        Title: <input type="text" value={title} onChange={onChangeTitle} />
      </label>
      <label>
        Url: <input type="text" value={url} onChange={onChangeUrl} />
      </label>
      <label>
        Description: <input type="text" value={desc} onChange={onChangeDesc} />
      </label>
      <label>
        Date: <input type="text" value={date} onChange={onChangeDate} />
      </label>
      <label>
        Author: <input type="text" value={author} onChange={onChangeAuthor} />
      </label>
      <div>
        <button onClick={onClick}>Save</button>
      </div>
    </div>
  );
}

ModeratorEditArticle.defaultProps = {};

ModeratorEditArticle.propTypes = {
  article: PropTypes.object,
  setArticle: PropTypes.func
};

export default ModeratorEditArticle;
