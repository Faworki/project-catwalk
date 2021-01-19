import React from 'react';
// import axios from 'axios';

class Sizes extends React.Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  componentDidMount() {}

  render () {
    return (
      <option value={this.props.size}>{this.props.size}</option>
    );
  }
}

export default Sizes;