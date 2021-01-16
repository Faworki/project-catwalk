import React, { Component } from 'react';
import RatingBreakdown from './reviewWidget/RatingBreakdown';
import ReviewList from './reviewWidget/ReviewList';

export class ReviewsWidget extends Component {
  render() {
    return (
      <div className="reviews-widget">
        <h3>{'Ratings & Reviews'}</h3>
        <div className="reviews-container">
          <RatingBreakdown />
          <ReviewList />
        </div>
      </div>
    );
  }
}

export default ReviewsWidget;

