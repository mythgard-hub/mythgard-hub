import React from 'react';
import PropTypes from 'prop-types';

class DeckExport extends React.Component {
  constructor(props) {
    super(props);
    this.state = { message: null };

    this.handleExport = this.handleExport.bind(this);
  }

  handleExport() {
    const { textToExport } = this.props;

    if (!textToExport.trim()) {
      this.setState({ message: 'No imported deck to export' });
      return;
    }

    if (!navigator || !navigator.clipboard || !navigator.clipboard.writeText) {
      this.setState({ message: 'Export not supported in this browser' });
      return;
    }

    navigator.clipboard.writeText(textToExport);
    this.setState({ message: 'Copied' });

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
        <button onClick={this.handleExport}>Export</button>
        &nbsp;
        {message && <span>{message}</span>}
      </React.Fragment>
    );
  }
}

DeckExport.propTypes = {
  textToExport: PropTypes.string
};

export default DeckExport;
