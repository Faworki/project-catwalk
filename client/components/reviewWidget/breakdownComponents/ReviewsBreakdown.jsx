import React from 'react';
import ReviewBar from './ReviewBar';

// todo: Calculate percentage of reviews for each star value
// todo: Pass percentage in to each ReviewBar
// todo: assign each bar to a star number

const ReviewsBreakdown = ({ratings}) => {
  return (
    <section>
      <ReviewBar />
      <ReviewBar />
      <ReviewBar />
      <ReviewBar />
      <ReviewBar />
    </section>
  );
};

export default ReviewsBreakdown;
