import { useEffect, useState } from 'react';
import { handleInputChangeHooks } from '../lib/form-utils.js';
import useConfig from '../lib/use-config.js';
import useConfigMutation from '../lib/use-config-mutation.js';

function ModEditSpoilers() {
  const { config, error, loading } = useConfig();
  const updateConfig = useConfigMutation();
  const [newSpoilerName, setNewSpoilerName] = useState('new spoiler');
  const [spoilersModel, setSpoilersModel] = useState(null);

  useEffect(() => {
    setSpoilersModel(
      (config &&
        config.spoilers &&
        config.spoilers.map(s => {
          return { ...s };
        })) ||
        []
    );
  }, [config]);

  if (error) {
    return 'error loading config';
  }

  if (loading) {
    return 'loading config';
  }

  const updateSpoilerName = (e, index) => {
    const val = e && e.target && e.target.value;
    if (val) {
      const newSpoilerNamesModel = [...spoilersModel];
      newSpoilerNamesModel[index].name = val;
      setSpoilersModel(newSpoilerNamesModel);
    }
    return val;
  };

  const commitSpoilerUpdate = index => {
    config.spoilers[index] = { ...spoilersModel[index] };
    updateConfig(config);
  };

  const commitSpoilerMoveUp = index => {
    if (!index) {
      return;
    }
    config.spoilers[index - 1] = { ...spoilersModel[index] };
    config.spoilers[index] = { ...spoilersModel[index - 1] };

    updateConfig(config);
  };

  const commitSpoilerMoveDown = index => {
    if (index + 1 >= config.spoilers.length) {
      return;
    }
    config.spoilers[index + 1] = { ...spoilersModel[index] };
    config.spoilers[index] = { ...spoilersModel[index + 1] };

    updateConfig(config);
  };

  const commitSpoilerDelete = index => {
    config.spoilers.splice(index, 1);
    updateConfig(config);
  };

  const persistNewSpoiler = () => {
    config.spoilers = config.spoilers || [];
    config.spoilers.push({ name: newSpoilerName });
    updateConfig(config);
  };

  return (
    <div>
      <div>
        <ol>
          <li>
            Add spoiler images to Amazon s3 cards bucket under spoilers folder
          </li>
          <li>
            Add card names matching images here. Follow normal card name rules.
          </li>
        </ol>
      </div>
      <style jsx>{`
        .add-form {
          display: flex;
          align-content: stretch;
          justify-content: center;
          margin: 20px 0;
        }
        .add-form > input {
          flex: 1;
          height: inherit;
          margin-right: 20px;
        }
        .add-form > button {
          flex: 0;
          margin-right: 20px;
        }
      `}</style>
      <div>
        {spoilersModel &&
          spoilersModel.map((s, index) => {
            return (
              <div key={index} className="add-form">
                <input
                  value={s.name}
                  onChange={e => updateSpoilerName(e, index)}
                  type="text"
                />
                <button onClick={() => commitSpoilerMoveUp(index)}>⬆️</button>
                <button onClick={() => commitSpoilerMoveDown(index)}>⬇️</button>
                <button onClick={() => commitSpoilerUpdate(index)}>
                  Update
                </button>
                <button onClick={() => commitSpoilerDelete(index)}>
                  Delete
                </button>
              </div>
            );
          })}
      </div>
      <div className="add-form">
        <input
          value={newSpoilerName}
          onChange={handleInputChangeHooks(setNewSpoilerName)}
          type="text"
        />
        <button onClick={persistNewSpoiler}>Add</button>
      </div>
    </div>
  );
}

export default ModEditSpoilers;
