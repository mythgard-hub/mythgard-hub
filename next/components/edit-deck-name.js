import { useContext } from 'react';
import PropTypes from 'prop-types';
import { ThemeContext } from './theme-context';

export default function EditDeckName(props) {
  const { deckName, onChange } = props;
  const theme = useContext(ThemeContext);

  return (
    <div className="deck-name-container">
      <style jsx>{`
        input {
          width: 100%;
          background-color: transparent;
          border: ${theme.inputBorder};
          border-radius: 10px;
          font-size: 20px;
          font-family: ${theme.fontFamily};
          padding: 5px 5px 7px 5px;
          color: ${theme.fontColor};
        }
        input::placeholder {
          padding: 5px 5px 7px 5px;
          color: ${theme.fontColor};
        }
      `}</style>
      <input
        value={deckName}
        data-cy="deckTitle"
        onChange={onChange}
        placeholder="Untitled"
      />
    </div>
  );
}

EditDeckName.defaultProps = {
  deckName: '[new deck]'
};

EditDeckName.propTypes = {
  deckName: PropTypes.string,
  onChange: PropTypes.func
};
