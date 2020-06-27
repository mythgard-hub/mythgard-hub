import React from 'react';
// import PropTypes from 'prop-types';
import { useState } from 'react';
// import { useMutation } from '@apollo/react-hooks';
import { handleInputChangeHooks } from '../lib/form-utils.js';

function modAccountEditor() {
  const [email, setEmail] = useState(-1);
  const onChangeEmail = handleInputChangeHooks(setEmail);

  const formData = {};
  const updateAccount = () => {};
  return (
    <div>
      <h1>Edit Accounts</h1>
      <label>
        Email: <input type="text" value={email} onChange={onChangeEmail} />
      </label>
      <label>
        Account Type:{' '}
        <select id="acctType" name="accountType">
          <option value="BASIC">Basic</option>
          <option value="COMMON">Common</option>
          <option value="UNCOMMON">Uncommon</option>
          <option value="RARE">Rare</option>
          <option value="EPIC">Epic</option>
          <option value="MYTHIC">Mythic</option>
        </select>
      </label>
      <br />
      <button style={{ width: 100 }} onClick={() => updateAccount(formData)}>
        Save
      </button>
    </div>
  );
}

// modAccountEditor.propTypes = {
//   modUser: PropTypes.object
// };

export default modAccountEditor;
