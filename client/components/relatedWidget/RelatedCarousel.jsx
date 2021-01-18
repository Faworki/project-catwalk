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
    this.productItems = ProductList({
      products: this.state.relatedProducts,
      images: this.state.relatedImages},
      this.state.selected);
    this.onSelect = this.onSelect.bind(this);
  }

  onSelect(key) {
    this.setState({ selected: key });
  }

  getRelatedProduct() {
    axios.get('/api/fec2/hrnyc/products/11001/related')
    .then(results=>{
      this.setState({relatedIds: results.data});
      return results.data.map(relatedId=>{
        return axios.get(`/api/fec2/hrnyc/products/${relatedId}`);
      });
    })
    .then(results=>{
      Promise.all(results)
      .then(results=>{
        return results.map((res)=>{
          return res.data;
        });
      })
      .then(results=>{
        this.setState({relatedProducts: results});
        return results;
      })
      .then(results=>{
        this.productItems = ProductList({
          products: this.state.relatedProducts,
          images: this.state.relatedImages},
          this.state.selected);
        console.log('this.productItems:', this.productItems);
      })
      .catch(err=>{ console.log('getRelatedProduct Promise.all error'); });
    })
    .catch(err=>{
      console.log('getRelatedProduct Error');
    });
  }

  getRelatedImages() {
    let imagesArray = this.state.relatedIds.map(relatedId=>{
      console.log('relatedId:', relatedId);
        return axios.get(`/api/fec2/hrnyc/products/${relatedId}/styles`);
      });

      Promise.all(imagesArray)
      .then(results=>{
        return results.map((res)=>{
          return res.data.results[0].photos[0].thumbnail_url;
        });
      })
      .then(results=>{
        this.setState({relatedImages: results});
      })
      .catch(err=>{
        console.log('getRelatedImages Promise.all error');
      });
      console.log('imagesArray:', this.state.relatedIds);
  }

  componentDidMount() {
    this.getRelatedProduct();
  }

  componentDidUpdate(prevProps) {
    if (this.props.product.id !== prevProps.product.id) {
      this.getRelatedImages();
    }
    this.productItems = ProductList({
      products: this.state.relatedProducts,
      images: this.state.relatedImages},
      this.state.selected);
  }

  render() {
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