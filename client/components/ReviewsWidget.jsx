import React, { Component } from 'react';
import RatingBreakdown from './reviewWidget/RatingBreakdown';
import ReviewList from './reviewWidget/ReviewList';

let dummyData = [
  {
    'review_id': 72746,
    rating: 5,
    summary: 'This product was great!',
    recommend: true,
    response: '',
    body:
      'I really did or did not like this product based on whether it was sustainably sourced. Then I found out that its made from nothing at all.',
    date: '2019-01-01T00:00:00.000Z',
    'reviewer_name': 'funtime',
    helpfulness: 8,
    photos: [],
  },
  {
    'review_id': 72747,
    rating: 4,
    summary: 'This product was ok!',
    recommend: false,
    response: '',
    body:
      'I really did not like this product solely because I am tiny and do not fit into it.',
    date: '2019-01-11T00:00:00.000Z',
    'reviewer_name': 'mymainstreammother',
    helpfulness: 2,
    photos: [],
  },
];

export class ReviewsWidget extends Component {
  constructor(props) {
    super(props);
    this.state = {
      reviewCount: 5,
      productReviews: dummyData,

    };
  }

  render() {
    return (
      <div className="reviews-widget">
        <h3>{'Ratings & Reviews'}</h3>
        <div className="reviews-container">
          <RatingBreakdown
            reviewMetaData={this.props.reviewMetaData}
            reviewAverage={this.props.reviewAverage}
            reviewCount={this.state.reviewCount}
          />
          <ReviewList reviews={this.state.productReviews} />
        </div>
      </div>
    );
  }
}

export default ReviewsWidget;
