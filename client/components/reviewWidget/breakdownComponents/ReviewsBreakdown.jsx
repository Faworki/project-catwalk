import React from 'react';
import ReviewBar from './ReviewBar';

const ReviewsBreakdown = ({ ratings }) => {
  let bars = [];
  let totalRatings = Object.values(ratings).reduce(
    (sum, num) => sum + parseInt(num),
    0
  );
  for (let i = 0; i < 6; i++) {
    let numRatings = ratings.hasOwnProperty(i) ? ratings[i] : 0;
    let percentOfRatings = Math.trunc((numRatings / totalRatings) * 100);
    bars.push(
      <ReviewBar key={i} starNum={i} percentOfRatings={percentOfRatings} />
    );
  }

  return <section>{bars}</section>;
};

export default ReviewsBreakdown;
