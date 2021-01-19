import React from 'react';
import axios from 'axios';
import Overview from './Overview.jsx';
import RelatedProducts from './RelatedProducts.jsx';
import QnAs from './QnAs/QnAs.jsx';
import RatingsAndReviews from './ReviewsWidget.jsx';

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
      reviewAverage: null,
      reviewCount: null,
      yourOutfit: []
    };
    this.getNewProduct = this.getNewProduct.bind(this);
  }

  getNewProduct(productId) {
    let getProduct = axios.get(`/api/fec2/hrnyc/products/${productId}`);
    let getReviewMetaData = axios.get(`/api/fec2/hrnyc/reviews/meta?product_id=${productId}`);
    Promise.all([getProduct, getReviewMetaData])
      .then((results) => {
        let product = results[0].data;
        let reviewMetaData = results[1].data;
        let reviewAverage = this.reviewAverage(reviewMetaData.ratings);
        let reviewCount = this.sumReviewCount(reviewMetaData.ratings);


        this.setState({
          product,
          reviewMetaData,
          reviewAverage,
          reviewCount
        });
      })
      .catch((err) => console.error(err));
  }

  componentDidMount() {
    this.getNewProduct(11001);
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

  render () {
    return (
      <div>
        <div>HEADER FOR OUR WEBSITE</div><br />
        <Overview
          product={this.state.product}
          reviewMetaData={this.state.reviewMetaData}
          reviewAverage={this.state.reviewAverage}
          yourOutfit={this.state.yourOutfit}
        /><br />
        <RelatedProducts
          product={this.state.product}
          reviewMetaData={this.state.reviewMetaData}
          reviewAverage={this.state.reviewAverage}
          yourOutfit={this.state.yourOutfit}
          getNewProduct={this.getNewProduct}
        /><br />
        <QnAs
          product={this.state.product}
        /><br />
        <RatingsAndReviews
          productId={this.state.product.id}
          reviewMetaData={this.state.reviewMetaData}
          reviewAverage={this.state.reviewAverage}
          reviewCount={this.state.reviewCount}
        /><br />
      </div>
    );
  }
}

export default App;
