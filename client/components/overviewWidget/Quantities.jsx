import React from 'react';
// import axios from 'axios';

class Quantities extends React.Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  componentDidMount() {}

  render () {
    return (
      <option value={this.props.quantity}>{this.props.quantity}</option>
    );
  }
}

export default Quantities;