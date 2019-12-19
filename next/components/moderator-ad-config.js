import React from 'react';
import PropTypes from 'prop-types';
import { useState } from 'react';
import { handleInputChangeHooks } from '../lib/form-utils.js';

function ModeratorAdConfig({ ad, setAd }) {
  const [enabled, setEnabled] = useState(ad.enabled);
  const onChangeEnabled = handleInputChangeHooks(setEnabled);
  const [url, setUrl] = useState(ad.url);
  const onChangeUrl = handleInputChangeHooks(setUrl);
  const [imgUrl, setImgUrl] = useState(ad.imgUrl);
  const onChangeImgUrl = handleInputChangeHooks(setImgUrl);
  const [startDate, setStartDate] = useState(ad.startDate);
  const onChangeStartDate = handleInputChangeHooks(setStartDate);
  const [endDate, setEndDate] = useState(ad.endDate);
  const onChangeEndDate = handleInputChangeHooks(setEndDate);

  const onClick = () => {
    setAd({
      enabled,
      url,
      imgUrl,
      startDate,
      endDate
    });
  };
  return (
    <div>
      <style jsx>{`
        .adForm {
          display: flex;
          flex-wrap: wrap;
        }
        label {
          flex-grow: 1;
          display: block;
          min-width: 400px;
          margin: 10px 20px;
        }

        input[type='text'] {
          display: block;
          width: 100%;
        }
        input[type='checkbox'] {
          display: inline;
        }
        button {
          display: inline;
          width: auto;
          padding: 5px 40px;
          margin: 0 20px 0 0;
        }
      `}</style>
      <div className="adForm">
        <label>
          <input type="text" value={url} onChange={onChangeUrl}></input> Ad
          target url
        </label>
        <label>
          <input type="text" value={imgUrl} onChange={onChangeImgUrl}></input>{' '}
          Ad image url
        </label>
        <label>
          <input
            type="text"
            value={startDate}
            onChange={onChangeStartDate}
          ></input>{' '}
          Ad start date
        </label>
        <label>
          <input type="text" value={endDate} onChange={onChangeEndDate}></input>{' '}
          Ad end date
        </label>
        <label>
          <input
            type="checkbox"
            checked={enabled}
            onChange={onChangeEnabled}
          ></input>{' '}
          Enable ad
        </label>
      </div>
      <div>
        <button onClick={onClick}>Save</button>
      </div>
    </div>
  );
}

ModeratorAdConfig.defaultProps = {
  ad: {
    enabled: false,
    url: 'https://mythgardhub.com/',
    imgUrl: 'https://cdn.mythgardhub.com/banner/Banner_Bulwark.jpg',
    startDate: new Date().toISOString(),
    endDate: new Date().toISOString()
  }
};

ModeratorAdConfig.propTypes = {
  ad: PropTypes.object,
  setAd: PropTypes.func
};

export default ModeratorAdConfig;
