import React from 'react';
import axios from 'axios';
import Overview from './Overview.jsx';
import RelatedProducts from './RelatedProducts.jsx';
import QuestionsAndAnswers from './QnAs.jsx';
import RatingsAndReviews from './ReviewsWidget.jsx';

class App extends React.Component {
  constructor() {
    super();

    this.state = {
      product: {},
      reviewMetaData: {},
      reviewAverage: null,
      yourOutfit: []
    };
  }

  componentDidMount() {
    // Set state for product
    axios.get('/api/fec2/hrnyc/products/11001')
      .then((productInfo) => {
        this.setState({
          product: productInfo.data
        });
      })
      .catch((err) => console.error(err));

      // Set state for reviewMetaData and reviewAverage
      axios.get('/api/fec2/hrnyc/reviews/meta?product_id=11001')
      .then((metaData) => {
        this.setState({
          reviewMetaData: metaData.data
        });
      })
      .then(() => {
        this.setState({
          reviewAverage: this.reviewAverage()
        });
      })
      .catch((err) => console.error(err));

    // Set state for yourOutfit
  }

  reviewAverage() {
    const reviews = this.state.reviewMetaData.ratings;
    let totalStars = 0;
    let totalVotes = 0;
    for (let rating in reviews) {
      totalStars += (parseInt(rating) * parseInt(reviews[rating]));
      totalVotes += parseInt(reviews[rating]);
    }
    return totalStars / totalVotes;
  }

  render () {
    return (
      <div>
        <div>HEADER FOR OUR WEBSITE</div><br />
        <Overview
          product={this.state.product}
          reviewData={this.state.reviewData}
          reviewMetaData={this.state.reviewMetaData}
          reviewAverage={this.state.reviewAverage}
          yourOutfit={this.state.yourOutfit}
        /><br />
        <RelatedProducts
          product={this.state.product}
          reviewData={this.state.reviewData}
          reviewMetaData={this.state.reviewMetaData}
          reviewAverage={this.state.reviewAverage}
          yourOutfit={this.state.yourOutfit}
        /><br />
        <QuestionsAndAnswers
          product={this.state.product}
        /><br />
        <RatingsAndReviews
          productId={this.state.product.id}
          reviewMetaData={this.state.reviewMetaData}
          reviewAverage={this.state.reviewAverage}
        /><br />
      </div>
    );
  }
}

export default App;