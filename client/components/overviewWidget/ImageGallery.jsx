import React from 'react';
import Thumbnails from './Thumbnails.jsx';
import axios from 'axios';
import './styles/OverviewStyles.scss';

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
      mainPhotoExpanded: false
    };

    this.upArrowClickHandler = this.upArrowClickHandler.bind(this);
    this.downArrowClickHandler = this.downArrowClickHandler.bind(this);
    this.leftArrowClickHandler = this.leftArrowClickHandler.bind(this);
    this.rightArrowClickHandler = this.rightArrowClickHandler.bind(this);
    this.thumbnailClickHandler = this.thumbnailClickHandler.bind(this);
    this.resizePictureClickHandler = this.resizePictureClickHandler.bind(this);
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

  thumbnailClickHandler(e) {
    const clickedThumbnailUrl = e.target.src;
    let clickedIndex = null;
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
        upButtonEnd: true,
        downButtonEnd: false,
        leftButtonEnd: true,
        rightButtonEnd: false,
      });
    } else if (clickedIndex === this.state.thumbnails.length - 1) {
      this.setState({
        upButtonEnd: false,
        downButtonEnd: true,
        leftButtonEnd: false,
        rightButtonEnd: true,
      });
    } else {
      this.setState({
        upButtonEnd: false,
        downButtonEnd: false,
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
      <div className="image-gallery image-gallery-grid">
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
          <br />
          <button
            onClick={this.upArrowClickHandler}
            style={this.state.upButtonEnd === true ? {display: 'none'} : null}
          ><i className="fas fa-arrow-up"></i></button>
          <button
            onClick={this.downArrowClickHandler}
            style={this.state.downButtonEnd === true ? {display: 'none'} : null}
          ><i className="fas fa-arrow-down"></i></button>
          <br />
        </div>
        <div>
          <img
            src={this.state.mainPhotoUrl}
            alt="Description"
            width={this.state.mainPhotoExpanded ? '450' : '300'}
            height={this.state.mainPhotoExpanded ? '675' : '450'}
          /><br />
          <button
            onClick={this.leftArrowClickHandler}
            style={this.state.leftButtonEnd === true ? {display: 'none'} : null}
          ><i className="fas fa-arrow-left"></i></button>
          <button
            onClick={this.rightArrowClickHandler}
            style={this.state.rightButtonEnd === true ? {display: 'none'} : null}
          ><i className="fas fa-arrow-right"></i></button>
          <button onClick={this.resizePictureClickHandler}><i className="fas fa-expand"></i></button>
          <br /><br />
        </div>
      </div>
    );
  }
}

export default ImageGallery;