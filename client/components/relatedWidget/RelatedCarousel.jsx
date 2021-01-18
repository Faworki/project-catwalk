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
      console.log('unresolved results:', results);
      // let resolvedProducts = Promise.all(results.products)
      //   .then(results=>{
      //     return results.map((res)=>{
      //       return res.data;
      //       });
      //       });
      //   let resolvedImages = Promise.all(results.images)
      //   .then(results=>{
      //     return results.map((res)=>{
      //       return res.data.results[0].photos[0].thumbnail_url;
      //     });
      //   });
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
          .then(results=>{ this.setState({relatedImages: results}); });
        })
        .catch(err=>{ console.log(err); });
    // .then(results=>{
    //   console.log('resolved results:', results);
    //   return {
    //   products: Promise.resolve(results.products),
    //   images: Promise.resolve(results.images)
    //   }
    // })
    // .then(results=>{
    //   console.log('resolved results again:', results);
    //   this.productItems = ProductList(results, this.state.selected);
    //   console.log('bundled state:', results);
    //   console.log('this.productItems:', this.productItems);
    // })
    // .catch(err=>{
    //   console.log('getRelatedProduct Promise.all error');
    // });
  }

  // getRelatedImages() {
  //   let imagesArray = this.state.relatedIds.map(relatedId=>{
  //     console.log('relatedId:', relatedId);
  //       return axios.get(`/api/fec2/hrnyc/products/${relatedId}/styles`);
  //     });

  //     Promise.all(imagesArray)
  //     .then(results=>{
  //       return results.map((res)=>{
  //         return res.data.results[0].photos[0].thumbnail_url;
  //       });
  //     })
  //     .then(results=>{
  //       this.setState({relatedImages: results});
  //     })
  //     .catch(err=>{
  //       console.log('getRelatedImages Promise.all error');
  //     });
  //     console.log('imagesArray:', this.state.relatedIds);
  // }

  buildCarousel() {
    this.productItems = ProductList(
      {
        products: this.state.relatedProducts,
        images: this.state.relatedImages
      },
      this.state.selected);
      console.log('inside buildCarousel');
  }

  componentDidMount() {
    console.log('componentDidMount');
    this.getRelatedProduct();
    this.buildCarousel();
  }

  componentDidUpdate(prevState) {
    console.log('componentDidUpdate');
    console.log(this.state);
    if (this.state.relatedImages !== prevState.relatedImages) {
      this.buildCarousel();
    }
  }

  render() {
    console.log('render');
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