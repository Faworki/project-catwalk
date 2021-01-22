import React from 'react';
import axios from 'axios';
import Overview from './Overview.jsx';
import RelatedProducts from './RelatedProducts.jsx';
import QnAs from './QnAs/QnAs.jsx';
import RatingsAndReviews from './ReviewsWidget.jsx';
import {
  BrowserRouter,
  Switch,
  Route,
  Link
} from "react-router-dom";


class App extends React.Component {
  constructor() {
    super();

    this.state = {
      product: {
        id: null,
        name: '',
        slogan: '',
        description: '',
        category: '',
        'default_price': '',
        features: [],
      },
      reviewMetaData: {
        'product_id': null,
        ratings: {},
        recommended: {},
        characteristics: {},
      },
      reviewAverage: 0,
      reviewCount: null,
      yourOutfit: [],
      styles: []
    };
    this.getNewProduct = this.getNewProduct.bind(this);
    this.addToOutfit = this.addToOutfit.bind(this);
    this.removeFromOutfit = this.removeFromOutfit.bind(this);
  }

  getNewProduct(productId) {
    let getProduct = axios.get(`/api/fec2/hrnyc/products/${productId}`);
    let getReviewMetaData = axios.get(`/api/fec2/hrnyc/reviews/meta?product_id=${productId}`);
    let getStyle = axios.get(`/api/fec2/hrnyc/products/${productId}/styles`);

    Promise.all([getProduct, getReviewMetaData, getStyle])
      .then((results) => {
        let product = results[0].data;
        let reviewMetaData = results[1].data;
        let reviewAverage = this.reviewAverage(reviewMetaData.ratings);
        let reviewCount = this.sumReviewCount(reviewMetaData.ratings);
        let styles = results[2].data.results;


        this.setState({
          product,
          reviewMetaData,
          reviewAverage,
          reviewCount,
          styles
        });
      })
      .catch((err) => console.error(err));
  }

  componentDidMount() {
    this.getNewProduct(11986);
  }

  reviewAverage(ratings) {
    let totalStars = 0;
    let totalVotes = 0;
    for (let rating in ratings) {
      totalStars += parseInt(rating) * parseInt(ratings[rating]);
      totalVotes += parseInt(ratings[rating]);
    }
    return (totalStars / totalVotes).toFixed(2);
  }

  sumReviewCount(ratings) {
    return Object.values(ratings).reduce((sum, num) => {
      return sum + parseInt(num);
    }, 0);
  }

  addToOutfit() {
    let productAlreadyInOutfit = false;
    let outfitArray = this.state.yourOutfit.slice();
    for (let x = 0; x < outfitArray.length; x++) {
      if (outfitArray[x].id === this.state.product.id) {
        productAlreadyInOutfit = true;
      }
    }
    if (!productAlreadyInOutfit) {
      outfitArray.push(this.state.product);
      this.setState({yourOutfit: outfitArray});
    }
  }

  removeFromOutfit(productId) {
    let outfitArray = this.state.yourOutfit.slice();
    for (let x = 0; x < outfitArray.length; x++) {
      if (outfitArray[x].id === productId) {
        outfitArray.splice(x, 1);
      }
    }
    this.setState({yourOutfit: outfitArray});
  }

  render () {
    return (
      <BrowserRouter>
        <div>
          <Overview
            product={this.state.product}
            reviewMetaData={this.state.reviewMetaData}
            reviewAverage={this.state.reviewAverage}
            yourOutfit={this.state.yourOutfit}
          />
          <RelatedProducts
            product={this.state.product}
            reviewMetaData={this.state.reviewMetaData}
            reviewAverage={this.state.reviewAverage}
            yourOutfit={this.state.yourOutfit}
            getNewProduct={this.getNewProduct}
            addToOutfit={this.addToOutfit}
            styles={this.state.styles}
          />
          <QnAs
            product={this.state.product}
          />
          <RatingsAndReviews
            productId={this.state.product.id}
            reviewMetaData={this.state.reviewMetaData}
            reviewAverage={this.state.reviewAverage}
            reviewCount={this.state.reviewCount}
          />
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
