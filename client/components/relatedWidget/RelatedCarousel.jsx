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
      selected: selected,
      relatedIds: [],
      relatedProducts: [],
      relatedImages: []
    };
    this.productItems = ProductList(
      {
        products: this.state.relatedProducts,
        images: this.state.relatedImages
      },
      this.state.selected,
      this.props.getNewProduct);
    this.onSelect = this.onSelect.bind(this);
  }

  onSelect(key) {
    this.setState({ selected: key });
  }

  getRelatedProduct(productId) {
    axios.get(`/api/fec2/hrnyc/products/${productId}/related`)
    .then(results=>{
      this.setState({relatedIds: results.data});
      let products = results.data.map(relatedId=>{
        return axios.get(`/api/fec2/hrnyc/products/${relatedId}`);
      });
      let images = results.data.map(relatedId=>{
        return axios.get(`/api/fec2/hrnyc/products/${relatedId}/styles`);
      });
      return {
        products: products,
        images: images
      };
    })
    .then(results=>{
      // console.log('unresolved results:', results);
          Promise.all(results.products)
          .then(results=>{
            return results.map((res)=>{
              return res.data;
            });
          })
          .then(results=>{ this.setState({relatedProducts: results}); })
          .catch(err=>{ console.log(err); });

          Promise.all(results.images)
          .then(results=>{
            return results.map((res)=>{
              return res.data.results[0].photos[0].thumbnail_url;
            });
          })
          .then(results=>{ this.setState({relatedImages: results}); })
          .catch(err=>{ console.log(err); });
    })
    .catch(err=>{ console.log(err); });
  }

  buildCarousel() {
    this.productItems = new ProductList(
      {
        products: this.state.relatedProducts,
        images: this.state.relatedImages
      },
      this.state.selected,
      this.props.getNewProduct);
      // console.log('inside buildCarousel');
  }

  componentDidMount() {
    // console.log('componentDidMount');
    // console.log(this.props.product)
    this.buildCarousel();
  }

  componentDidUpdate(prevProps) {
    // console.log('componentDidUpdate');
    // console.log('state:', this.state);
    if (this.props.product.id !== prevProps.product.id) {
      // this.getRelatedProduct(this.props.product.id);
      this.buildCarousel();
    }
  }

  render() {
    // console.log('render');
    return (
      <div>
        Related Products Carousel
        <ScrollMenu
          data={this.productItems}
          arrowLeft={ArrowLeft}
          arrowRight={ArrowRight}
          selected={selected}
          onSelect={this.onSelect}
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