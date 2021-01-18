import React from 'react';
// import axios from 'axios';

class Thumbnails extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      productId: null,
      thumbnails: []
    };
  }

  componentDidMount() {}

  componentDidUpdate(prevProps) {
    if (this.props.productId !== prevProps.productId) {
      this.setState({
        productId: this.props.productId,
        thumbnails: this.props.thumbnails
      });
    }
  }

  render () {
    return (
      <span>
        <img
          src={this.props.thumbnail}
          alt="Thumbnail"
          width="60"
          height="90"
        />
      </span>
    );
  }
}

export default Thumbnails;