import useConfig from '../lib/use-config.js';
import useConfigMutation from '../lib/use-config-mutation.js';

function ModEditSpoilers() {
  const { config, error, loading } = useConfig();

  if (error) {
    return 'error loading config';
  }

  if (loading) {
    return 'loading config';
  }

  return (
    <div>
      <p>
        <ol>
          <li>
            Add spoiler images to Amazon s3 cards bucket under spoilers folder
          </li>
          <li>
            Add card names matching images here. Follow normal card name rules.
          </li>
        </ol>
      </p>
      <style jsx>{`
        .add-form {
          display: flex;
          align-content: stretch;
          justify-content: center;
          max-width: 600px;
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
        {config.spoilers &&
          config.spoilers.map(s => {
            return (
              <div key={s.name} className="add-form">
                <input value={s.name} type="text" />
                <button>Update</button>
                <button>Delete</button>
              </div>
            );
          })}
      </div>
      <div className="add-form">
        <input type="text" />
        <button>Add</button>
      </div>
    </div>
  );
}

export default ModEditSpoilers;
