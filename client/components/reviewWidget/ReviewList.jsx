import React from 'react';
import ReviewCard from './ReviewCard';

const ReviewList = () => {
  return (
    <main>
      <div className="list-controls">
        248 reviews, sorted by
        <select>
          <option selected value='relevant'>Relevant</option>
          <option value='helpful'>Helpful</option>
          <option value='newest'>Newest</option>
        </select>
      </div>
      <div className="card-container">
        <ReviewCard />
        <ReviewCard />
      </div>
      <div>
        <button>More Reviews</button>
        <button>Add A Review</button>
      </div>
    </main>
  );
};

export default ReviewList;
