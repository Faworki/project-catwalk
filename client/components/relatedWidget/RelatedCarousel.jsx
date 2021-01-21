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

  // getRelatedProduct(productId) {
  //   axios.get(`/api/fec2/hrnyc/products/${productId}/related`)
  //   .then(results=>{
  //     // this.setState({relatedIds: results.data});
  //     let products = results.data.map(relatedId=>{
  //       return axios.get(`/api/fec2/hrnyc/products/${relatedId}`);
  //     });
  //     let images = results.data.map(relatedId=>{
  //       return axios.get(`/api/fec2/hrnyc/products/${relatedId}/styles`);
  //     });
  //     return {
  //       products: products,
  //       images: images
  //     };
  //   })
  //   .then(results=>{
  //         Promise.all(results.products)
  //         .then(results=>{
  //           return results.map((res)=>{
  //             return res.data;
  //           });
  //         })
  //         .then(results=>{ this.setState({relatedProducts: results}); })
  //         .catch(err=>{ console.log(err); });

  //         Promise.all(results.images)
  //         .then(results=>{
  //           return results.map((res)=>{
  //             return res.data.results[0].photos[0].thumbnail_url;
  //           });
  //         })
  //         .then(results=>{ this.setState({relatedImages: results}); })
  //         .catch(err=>{ console.log(err); });
  //   })
  //   .catch(err=>{ console.log(err); });
  // }

  buildCarousel() {
    this.productItems = new ProductList(
      {
        products: this.state.relatedProducts,
        images: this.state.relatedImages
      },
      this.state.selected,
      this.props.getNewProduct);

      console.log('building carousel')
  }

  getRelatedIds(productId) {
    axios.get(`/api/fec2/hrnyc/products/${productId}/related`)
    .then(relatedProductIdArray=>{
      this.setState({relatedIds: relatedProductIdArray.data});
    })
    .catch((err)=>{
      console.log(err);
    });
  }

  getRelatedProducts(idArray) {
    idArray.map(relatedId=>{
      return axios.get(`/api/fec2/hrnyc/products/${relatedId}`);
    })
    .then(relatedProductPromiseArray=>{
      relatedProductArray.map(relatedProduct=>{
        return relatedProduct.data;
      });
    })
    .then(relatedProductObjectArray=>{
      this.setState({relatedProducts: relatedProductObjectArray});
    })
    .catch(err=>{
      console.log(err);
    });
  }

  getRelatedImages(idArray) {
    idArray.map(relatedId=>{
      return axios.get(`/api/fec2/hrnyc/products/${relatedId}/styles`);
    })
    .then(relatedImagePromiseArray=>{
      relatedImagePromiseArray.map(relatedImage=>{
        return relatedImage.data.results[0].photos[0].thumbnail_url;
      });
    })
    .then(relatedImageUrlArray=>{
      this.setState({relatedImages: relatedImageUrlArray});
    })
    .catch(err=>{
      console.log(err);
    });
  }

  // componentDidMount() {
  //   this.buildCarousel();
  // }

  async componentDidUpdate(prevProps) {
    //get array of related ID's
    if (this.props.product.id !== prevProps.product.id) {
      const relatedIds = await axios.get(`/api/fec2/hrnyc/products/${this.props.product.id}/related`)
      const ids = relatedIds.data
      // this.setState({relatedIds: ids});

      //when that's done, get the products
      const relatedProductsPromises = ids.map(id=>{
        return axios.get(`/api/fec2/hrnyc/products/${id}`)
        .then(productPromise=>{
          return productPromise.data
        })
      })

      // const relatedProductsPromises = async() =>{
      //   let array = [];
      //   for (const id of ids) {
      //     array.push(await axios.get(`/api/fec2/hrnyc/products/${id}`)
      //     .then(productPromise=>{
      //       return productPromise.data
      //     }))
      //   }
      //   console.log(array)
      //   return array;
      // }

      //and then the images
      const relatedImagesPromises = ids.map(id=>{
        return axios.get(`/api/fec2/hrnyc/products/${id}/styles`)
        .then(imagePromise=>{
          return imagePromise.data.results[0].photos[0].thumbnail_url
        })
      })

      // const relatedImagesPromises = async() =>{
      //   let array = [];
      //   for (const id of ids) {
      //     array.push(await axios.get(`/api/fec2/hrnyc/products/${id}/styles`)
      //     .then(imagePromise=>{
      //       return imagePromise.data.results[0].photos[0].thumbnail_url
      //     }))
      //   }
      //   console.log(array)
      //   return array;
      // }

      //resolve those promises
      const relatedProducts = await Promise.all(relatedProductsPromises);

      this.setState({
        relatedProducts: relatedProducts})

      const relatedImages = await Promise.all(relatedImagesPromises);

      //only after they have resolved, store them as state
      this.setState({
        relatedImages: relatedImages
      })
      // this.getRelatedIds(this.props.product.id);
      // this.getRelatedProducts(this.state.relatedIds);
      // this.getRelatedImages(this.state.relatedIds);
    }
    this.buildCarousel();
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