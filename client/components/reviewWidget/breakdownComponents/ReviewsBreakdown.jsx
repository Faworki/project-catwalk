import React from 'react';
import ReviewBar from './ReviewBar';

const ReviewsBreakdown = ({ ratings, toggleRatingFilter, reviewFilters }) => {
  let bars = [];
  let totalRatings = Object.values(ratings).reduce(
    (sum, num) => sum + parseInt(num),
    0
  );
  for (let i = 5; i > 0; i--) {
    let numRatings = ratings.hasOwnProperty(i) ? ratings[i] : 0;
    let percentOfRatings = Math.trunc((numRatings / totalRatings) * 100);
    bars.push(
      <ReviewBar
        key={i}
        rating={i}
        active={reviewFilters[i] || reviewFilters.count === 0}
        percentOfRatings={percentOfRatings}
        toggleRatingFilter={toggleRatingFilter}
      />
    );
  }

  return <section>{bars}</section>;
};

export default ReviewsBreakdown;
