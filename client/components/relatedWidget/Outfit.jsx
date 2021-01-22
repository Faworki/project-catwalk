import React from 'react';
import ScrollMenu from 'react-horizontal-scrolling-menu';
import ProductList from './ProductList.jsx';
import ArrowButton from './ArrowButton.jsx';
import AddButton from './AddButton';
import axios from 'axios';

const selected = null;
const ArrowLeft = ArrowButton({
  text: '<',
  className: 'arrow-prev'
});
const ArrowRight = ArrowButton({
  text: '>',
  className: 'arrow-next'
});

class Outfit extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      image: []
    };
    this.productItems = [];
  }

  getImage (productId) {
      let imageArray = this.state.image.slice();
      imageArray.push(this.props.styles[0].photos[0].thumbnail_url);
      this.setState({image: imageArray});
  }

  buildCarousel() {
  this.productItems = ProductList(
    {
      products: this.props.yourOutfit,
      images: this.state.image
    },
      this.props.getNewProduct,
      this.props.removeFromOutfit,
      this.props.reviewAverage
      );
  }

  componentDidUpdate(prevState) {
    if (this.state.images.length !== prevState.images.length) {
      this.getImage(this.props.product.id);
    }
    this.buildCarousel();
  }

  componentDidUpdate(prevProps) {
    if (this.props.product.id !== prevProps.product.id) {
      this.getImage();
    }
    this.buildCarousel();
  }

  render() {
    return (
      <div>
        Outfit Carousel
        <ScrollMenu
          data={[
            <AddButton
              product={this.props.product}
              yourOutfit={this.props.yourOutfit}
              addToOutfit={this.props.addToOutfit}
            />,
            ...this.productItems
          ]}
          arrowLeft={ArrowLeft}
          arrowRight={ArrowRight}
          selected={selected}
          alignCenter={false}
          wheel={false}
          hideArrows={true}
          arrowDisabledClass='scroll-menu-arrow--disabled'
          hideSingleArrow={true}
        />
      </div>
    );
  }
}

export default Outfit;
