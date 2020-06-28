import React from 'react';
import { useState } from 'react';
import { handleInputChangeHooks } from '../lib/form-utils.js';
import useAccountMutation from '../lib/use-account-mutation.js';

function modAccountEditor() {
  const [email, setEmail] = useState(-1);
  const onChangeEmail = handleInputChangeHooks(setEmail);
  const [accountType, setAccountType] = useState('BASIC');
  const onChangeAccountType = handleInputChangeHooks(setAccountType);
  const updateAccountMutation = useAccountMutation();

  const formData = {};
  const updateAccount = () => updateAccountMutation({ email, accountType });
  return (
    <div>
      <h1>Edit Accounts</h1>
      <label>
        Email: <input type="text" value={email} onChange={onChangeEmail} />
      </label>
      <label>
        Account Type:{' '}
        <select id="acctType" name="accountType" onChange={onChangeAccountType}>
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
