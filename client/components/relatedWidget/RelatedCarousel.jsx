import React from 'react';
import ScrollMenu from 'react-horizontal-scrolling-menu';
import ProductList from './ProductList.jsx';
import ArrowButton from './ArrowButton.jsx';
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
      relatedImages: []
    };
    this.productItems = [];
  }

  buildCarousel() {
    this.productItems = ProductList(
      {
        products: this.state.relatedProducts,
        images: this.state.relatedImages
      },
      this.props.getNewProduct,
      ()=>{console.log('carousel callback')},
      this.props.reviewAverage
      );
  }

  async componentDidUpdate(prevProps) {
    if (this.props.product.id !== prevProps.product.id) {

      //get array of related ID's
      const relatedIds = await axios.get(`/api/fec2/hrnyc/products/${this.props.product.id}/related`)
      const ids = relatedIds.data
      // this.setState({relatedIds: ids});

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
    //try this
    // const carousel = this.productItems;
    return (
      <div>
        Related Products Carousel
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
      </div>
    );
  }
}

export default RelatedCarousel;