import React from 'react';
import PropTypes from 'prop-types';
import { useState } from 'react';
import { handleInputChangeHooks } from '../lib/form-utils.js';

function ModeratorEditArticle({ article, setArticle, i, hasDelete, onDelete }) {
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
  const [index, setIndex] = useState(i);
  const onChangeIndex = handleInputChangeHooks(setIndex);

  const onClick = () => {
    const newArticle = {
      title,
      url,
      description: desc,
      date,
      author
    };
    setArticle(newArticle, index);
  };
  return (
    <div>
      <style jsx>{`
        .articleForm {
          display: flex;
          flex-wrap: wrap;
        }
        label {
          flex-grow: 1;
          display: block;
          min-width: 400px;
          margin: 10px 20px;
        }

        textarea,
        input {
          display: block;
          width: 100%;
        }
        button {
          display: inline;
          width: auto;
          padding: 5px 40px;
          margin: 0 20px 0 0;
        }
      `}</style>
      <div className="articleForm">
        <label>
          Title: <input type="text" value={title} onChange={onChangeTitle} />
        </label>
        <label>
          Url: <input type="text" value={url} onChange={onChangeUrl} />
        </label>
        <label>
          Description: <textarea value={desc} onChange={onChangeDesc} />
        </label>
        <label>
          Date: <input type="text" value={date} onChange={onChangeDate} />
        </label>
        <label>
          Author: <input type="text" value={author} onChange={onChangeAuthor} />
        </label>
        <label>
          Order: <input type="text" value={index} onChange={onChangeIndex} />
          <span> - zero through three appears in top media</span>
        </label>
      </div>
      <div>
        <button onClick={onClick}>Save</button>
        {hasDelete && <button onClick={onDelete}>Delete</button>}
      </div>
    </div>
  );
}

ModeratorEditArticle.defaultProps = {
  i: 0,
  article: {
    title: '',
    description: '',
    date: new Date().toISOString(),
    url: 'https://mythgardhub.com',
    author: 'Mythgard Hub',
    order: -1
  },
  hasDelete: false
};

ModeratorEditArticle.propTypes = {
  article: PropTypes.object,
  setArticle: PropTypes.func,
  i: PropTypes.number,
  hasDelete: PropTypes.bool,
  onDelete: PropTypes.func
};

export default ModeratorEditArticle;
