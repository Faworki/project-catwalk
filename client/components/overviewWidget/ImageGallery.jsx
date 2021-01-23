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
      leftButtonEnd: true,
      rightButtonEnd: false,
      mainPhotoExpanded: false
    };

    this.arrowClickHandler = this.arrowClickHandler.bind(this);
    this.thumbnailClickHandler = this.thumbnailClickHandler.bind(this);
    this.resizePictureClickHandler = this.resizePictureClickHandler.bind(this);
  }

  componentDidUpdate(prevProps) {
    // state update if product changes
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

    // state update if selected style for given product changes
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

  arrowClickHandler(arrowDirection) {
    if (arrowDirection === 'left') {
      if (this.state.rightButtonEnd === true) {
        this.setState({
          rightButtonEnd: false
        });
      }
      const originalMainPhotoUrl = this.state.mainPhotoUrl;
      for (let i = 0; i < this.state.thumbnails.length; i++) {
        if (this.state.thumbnails[i].url === originalMainPhotoUrl) {
          this.setState({
            mainPhotoUrl: this.state.thumbnails[i - 1].url
          });
          if (i - 2 < 0) {
            this.state.leftButtonEnd = true;
          }
        }
      }
    }
    // Right-arrow button clicked
    if (arrowDirection === 'right') {
      if (this.state.leftButtonEnd === true) {
        this.setState({
          leftButtonEnd: false
        });
      }
      const originalMainPhotoUrl = this.state.mainPhotoUrl;
      for (let i = 0; i < this.state.thumbnails.length; i++) {
        if (this.state.thumbnails[i].url === originalMainPhotoUrl) {
          this.setState({
            mainPhotoUrl: this.state.thumbnails[i + 1].url
          });
          if (i + 2 >= this.state.thumbnails.length) {
            this.state.rightButtonEnd = true;
          }
        }
      }
    }
  }

  thumbnailClickHandler(e) {
    const clickedThumbnailUrl = e.target.src;
    let clickedIndex;
    let thumbnail = this.state.thumbnails.filter((thumbnail, index) => {
      if (thumbnail.thumbnail_url === clickedThumbnailUrl) {
        clickedIndex = index;
        return thumbnail.thumbnail_url === clickedThumbnailUrl;
      }
    });
    this.setState({
      mainPhotoUrl: thumbnail[0].url
    });
    if (clickedIndex === 0) {
      this.setState({
        leftButtonEnd: true,
        rightButtonEnd: false,
      });
    } else if (clickedIndex === this.state.thumbnails.length - 1) {
      this.setState({
        leftButtonEnd: false,
        rightButtonEnd: true,
      });
    } else {
      this.setState({
        leftButtonEnd: false,
        rightButtonEnd: false,
      });
    }
  }

  resizePictureClickHandler() {
    this.setState({
      mainPhotoExpanded: !this.state.mainPhotoExpanded
    });
  }

  render() {
    return (
      <div className="image-gallery-grid">
        <div>
          {this.state.thumbnails.map((thumbnail, index) => {
            return (
            <Thumbnails
              key={index}
              thumbnail={thumbnail.thumbnail_url}
              thumbnailClickHandler={this.thumbnailClickHandler}
            />
            );
          })}
        </div>
        <div>
          <img
            src={this.state.mainPhotoUrl}
            alt="Description"
            width={this.state.mainPhotoExpanded ? '450' : '300'}
            height={this.state.mainPhotoExpanded ? '675' : '450'}
          /><br />
          <button
            onClick={() => this.arrowClickHandler('left')}
            style={this.state.leftButtonEnd === true ? {display: 'none'} : null}
          ><i className="fas fa-arrow-left"></i></button>
          <button
            onClick={() => this.arrowClickHandler('right')}
            style={this.state.rightButtonEnd === true ? {display: 'none'} : null}
          ><i className="fas fa-arrow-right"></i></button>
          <button onClick={this.resizePictureClickHandler}><i className="fas fa-expand"></i></button>
        </div>
      </div>
    );
  }
}

export default ImageGallery;