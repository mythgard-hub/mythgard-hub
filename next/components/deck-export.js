import React from 'react';
import PropTypes from 'prop-types';
import { copyToClipboard } from '../lib/copy-to-clipboard';
import { exportDeck } from '../lib/export-utils';

class DeckExport extends React.Component {
  constructor(props) {
    super(props);
    this.state = { message: null };

    this.handleExport = this.handleExport.bind(this);
  }

  handleExport() {
    const { deckInProgress } = this.props;
    const textToExport = exportDeck(deckInProgress);

    if (!textToExport.trim()) {
      this.setState({ message: 'No imported deck to export' });
      return;
    }

    const success = copyToClipboard(textToExport);
    this.setState({ message: success ? 'Copied' : 'Failed to copy' });

    // Make message disappear
    window.setTimeout(() => {
      this.setState({
        message: null
      });
    }, 2000);
  }

  render() {
    const { message } = this.state;

    return (
      <React.Fragment>
        <button onClick={this.handleExport} data-cy="exportDeckButton">
          Export
        </button>
        &nbsp;
        {message && <span data-cy="exportDeckSuccess">{message}</span>}
      </React.Fragment>
    );
  }
}

DeckExport.propTypes = {
  deckInProgress: PropTypes.shape({
    deckName: PropTypes.string,
    deckPath: PropTypes.string,
    deckPower: PropTypes.string,
    deckCoverArt: PropTypes.string,
    mainDeck: PropTypes.shape({
      id: PropTypes.number,
      quantity: PropTypes.number,
      name: PropTypes.string
    }),
    errors: PropTypes.arrayOf(PropTypes.string)
  })
};

export default DeckExport;
