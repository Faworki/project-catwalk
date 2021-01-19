import React from 'react';
import Thumbnails from './Thumbnails.jsx';
import axios from 'axios';

class ImageGallery extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      productId: null,
      mainPhotoUrl: '',
      thumbnails: []
    };
  }

  componentDidMount() {}

  componentDidUpdate(prevProps) {
    if (this.props.product !== prevProps.product) {
      this.setState({
        productId: this.props.product.id
      });
      axios.get(`/api/fec2/hrnyc/products/${this.props.product.id}/styles`)
        .then(({data}) => {
          this.setState({
            mainPhotoUrl: data.results[0].photos[0].url,
            thumbnails: data.results[0].photos
          });
        })
        .catch((err) => {
          console.error(err);
        });
    }
  }

  render() {
    return (
      <div>
        {this.state.thumbnails.map((thumbnail, index) => {
          return (<Thumbnails key={index} thumbnail={thumbnail.thumbnail_url} />);
        })}
        <br />
        <img
          src={this.state.mainPhotoUrl}
          alt="Description"
          width="300"
          height="450"
        /><br /><br />
      </div>
    );
  }
}

export default ImageGallery;