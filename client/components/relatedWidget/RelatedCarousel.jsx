import React from 'react';
import ScrollMenu from 'react-horizontal-scrolling-menu';
import ProductList from './ProductList.jsx';
import ArrowButton from './ArrowButton.jsx';
import Comparison from './Comparison.jsx';
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

class RelatedCarousel extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      relatedIds: [],
      relatedProducts: [],
      relatedImages: [],
      display: false,
      productIndex: null
    };
    this.productItems = [];
    this.showModal = this.showModal.bind(this);
  }

  showModal() {
    this.setState({display: !this.state.display});
  }

  buildCarousel() {
    this.productItems = ProductList(
      {
        products: this.state.relatedProducts,
        images: this.state.relatedImages
      },
      this.props.getNewProduct,
      this.showModal,
      this.props.reviewAverage
      );
  }

  async componentDidUpdate(prevProps) {
    if (this.props.product.id !== prevProps.product.id) {

      //get array of related ID's
      const relatedIds = await axios.get(`/api/fec2/hrnyc/products/${this.props.product.id}/related`)
      const ids = relatedIds.data

      //only when that has finished, get the product objects
      const relatedProductsPromises = ids.map(id=>{
        return axios.get(`/api/fec2/hrnyc/products/${id}`)
        .then(productPromise=>{
          return productPromise.data
        })
      })

      //and then the images
      const relatedImagesPromises = ids.map(id=>{
        return axios.get(`/api/fec2/hrnyc/products/${id}/styles`)
        .then(imagePromise=>{
          return imagePromise.data.results[0].photos[0].thumbnail_url
        })
      })

      //resolve those promises
      const relatedProducts = await Promise.all(relatedProductsPromises);
      const relatedImages = await Promise.all(relatedImagesPromises);

      //only after they have resolved, store them as state
      this.setState({
        relatedProducts: relatedProducts,
        relatedImages: relatedImages
      })
    }
    this.buildCarousel();
  }

  render() {
    this.buildCarousel();
    return (
      <div>
        <div className='widgetHeader'>Related Products</div>
        <ScrollMenu
          data={this.productItems}
          arrowLeft={ArrowLeft}
          arrowRight={ArrowRight}
          selected={selected}
          alignCenter={false}
          wheel={false}
          hideArrows={true}
          arrowDisabledClass='scroll-menu-arrow--disabled'
          hideSingleArrow={true}
        />
        <Comparison
        product={this.props.product}
        showModal={this.showModal}
        isOpen={this.state.display}
        />
      </div>
    );
  }
}

export default RelatedCarousel;