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
      <div>
        <img
          src={this.props.thumbnail}
          alt="Thumbnail"
          width="60"
          height="90"
          onClick={this.props.thumbnailClickHandler}
          style={styles}
        />{' '}
      </div>
    );
  }
}

export default Thumbnails;

const styles = {
  borderRadius: '100%'
};