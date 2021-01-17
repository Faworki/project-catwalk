import React from 'react';
import Thumbnails from './Thumbnails.jsx';
import axios from 'axios';

class ImageGallery extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      productId: null,
      styles: {},
      mainPhotoUrl: ''
    };
  }

  componentDidMount() {}

  componentDidUpdate(prevProps) {}

  render() {
    return (
      <div>
        <Thumbnails />
        <img
          src='https://images.unsplash.com/photo-1556304653-cba65c59b3c5?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2761&q=80'
          alt="Description"
          width="300"
          height="450"
        /><br /><br />
      </div>
    );
  }
}

export default ImageGallery;