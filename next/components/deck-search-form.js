import React from 'react';
import PropTypes from 'prop-types';

class DeckSearchForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = { name: '' };

    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleInputChange(event) {
    const target = event.target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const name = target.name;

    this.setState({
      [name]: value
    });
  }

  handleSubmit(e) {
    e.preventDefault();
    this.props.onSubmit(this.state);
  }

  render() {
    return (
      <form>
        <label>
          Deck Name:
          <input
            type="text"
            value={this.state.name}
            name="name"
            onChange={this.handleInputChange}
          />
        </label>
        <br />
        <br />
        <input type="submit" value="Search" onClick={this.handleSubmit} />
      </form>
    );
  }
}
DeckSearchForm.propTypes = {
  onSubmit: PropTypes.func
};

export default DeckSearchForm;
