import React from 'react';
// import axios from 'axios';

class Styles extends React.Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  componentDidMount() {}

  render () {
    return (
      <span>
        <img
          src={this.props.thumbnail}
          alt="Thumbnail"
          width="60"
          height="90"
        />{' '}
      </span>
    );
  }
}

export default Styles;