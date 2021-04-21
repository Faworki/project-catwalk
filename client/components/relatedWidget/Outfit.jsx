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
    this.getImage = this.getImage.bind(this);
    this.removeOutfitImage = this.removeOutfitImage.bind(this);
  }

  getImage(image) {
      let imageArray = this.state.image.slice();
      imageArray.push(image);
      this.setState({image: imageArray});
  }

  removeOutfitImage(index) {
    let outfitImages = this.state.image.slice();
    outfitImages.splice(index, 1);
    this.setState({image: outfitImages});
  }

  buildCarousel() {
  this.productItems = ProductList(
    {
      products: this.props.yourOutfit,
      images: this.state.image
    },
      this.props.getNewProduct,
      this.props.removeFromOutfit,
      this.props.reviewAverage,
      this.removeOutfitImage
      );
  }

  render() {
    this.buildCarousel();
    return (
      <div>
        <div className='widgetHeader'>My Outfit</div>
        <ScrollMenu
          data={[
            <AddButton
              product={this.props.product}
              yourOutfit={this.props.yourOutfit}
              addToOutfit={this.props.addToOutfit}
              getImage={this.getImage}
              productImage={this.props.styles}
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
