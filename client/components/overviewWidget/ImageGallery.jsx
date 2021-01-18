import React from 'react';
import Thumbnails from './Thumbnails.jsx';
import axios from 'axios';

class ImageGallery extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      mainPhotoUrl: '',
      thumbnails: [],
      styles: [],
      upButtonEnd: true,
      downButtonEnd: false,
      leftButtonEnd: true,
      rightButtonEnd: false,
    };

    this.upArrowClickHandler = this.upArrowClickHandler.bind(this);
    this.downArrowClickHandler = this.downArrowClickHandler.bind(this);
    this.leftArrowClickHandler = this.leftArrowClickHandler.bind(this);
    this.rightArrowClickHandler = this.rightArrowClickHandler.bind(this);
  }

  componentDidUpdate(prevProps) {
    if (this.props.product !== prevProps.product) {
      axios.get(`/api/fec2/hrnyc/products/${this.props.product.id}/styles`)
        .then(({data}) => {
          this.setState({
            mainPhotoUrl: data.results[0].photos[0].url,
            thumbnails: data.results[0].photos,
            styles: data.results,
          });
        })
        .catch((err) => {
          console.error(err);
        });
    }

    if (this.props.selectedStyle !== prevProps.selectedStyle) {
      const newStyle = this.state.styles.filter((style) => {
        return style.style_id === parseInt(this.props.selectedStyle);
      });
      this.setState({
        mainPhotoUrl: newStyle[0].photos[0].url,
        thumbnails: newStyle[0].photos,
      });
    }
  }

  upArrowClickHandler() {
    this.state.downButtonEnd = false;
    this.state.rightButtonEnd = false;
    const originalMainPhotoUrl = this.state.mainPhotoUrl;
    for (let i = 0; i < this.state.thumbnails.length; i++) {
      if (this.state.thumbnails[i].url === originalMainPhotoUrl) {
        this.setState({
          mainPhotoUrl: this.state.thumbnails[i - 1].url
        });
        if (i - 2 < 0) {
          this.state.upButtonEnd = true;
          this.state.leftButtonEnd = true;
        }
      }
    }
  }

  downArrowClickHandler() {
    this.state.upButtonEnd = false;
    this.state.leftButtonEnd = false;
    const originalMainPhotoUrl = this.state.mainPhotoUrl;
    for (let i = 0; i < this.state.thumbnails.length; i++) {
      if (this.state.thumbnails[i].url === originalMainPhotoUrl) {
        this.setState({
          mainPhotoUrl: this.state.thumbnails[i + 1].url
        });
        if (i + 2 >= this.state.thumbnails.length) {
          this.state.downButtonEnd = true;
          this.state.rightButtonEnd = true;
        }
      }
    }
  }

  leftArrowClickHandler() {
    this.state.rightButtonEnd = false;
    this.state.downButtonEnd = false;
    const originalMainPhotoUrl = this.state.mainPhotoUrl;
    for (let i = 0; i < this.state.thumbnails.length; i++) {
      if (this.state.thumbnails[i].url === originalMainPhotoUrl) {
        this.setState({
          mainPhotoUrl: this.state.thumbnails[i - 1].url
        });
        if (i - 2 < 0) {
          this.state.leftButtonEnd = true;
          this.state.upButtonEnd = true;
        }
      }
    }
  }

  rightArrowClickHandler() {
    this.state.leftButtonEnd = false;
    this.state.upButtonEnd = false;
    const originalMainPhotoUrl = this.state.mainPhotoUrl;
    for (let i = 0; i < this.state.thumbnails.length; i++) {
      if (this.state.thumbnails[i].url === originalMainPhotoUrl) {
        this.setState({
          mainPhotoUrl: this.state.thumbnails[i + 1].url
        });
        if (i + 2 >= this.state.thumbnails.length) {
          this.state.rightButtonEnd = true;
          this.state.downButtonEnd = true;
        }
      }
    }
  }

  render() {
    return (
      <div>
        {this.state.thumbnails.map((thumbnail, index) => {
          return (<Thumbnails key={index} thumbnail={thumbnail.thumbnail_url} />);
        })}
        <br />
        <button
          onClick={this.upArrowClickHandler}
          style={this.state.upButtonEnd === true ? {display: 'none'} : null}
        >&uarr;</button>
        <button
          onClick={this.downArrowClickHandler}
          style={this.state.downButtonEnd === true ? {display: 'none'} : null}
        >&darr;</button>
        <br />
        <img
          src={this.state.mainPhotoUrl}
          alt="Description"
          width="300"
          height="450"
        /><br />
        <button
          onClick={this.leftArrowClickHandler}
          style={this.state.leftButtonEnd === true ? {display: 'none'} : null}
        >&larr;</button>
        <button
          onClick={this.rightArrowClickHandler}
          style={this.state.rightButtonEnd === true ? {display: 'none'} : null}
        >&rarr;</button>
        <br /><br />
      </div>
    );
  }
}

export default ImageGallery;