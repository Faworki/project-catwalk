import React, { useState } from 'react';
import ReviewCard from './ReviewCard';

// todo: Look in to making select element accessible friendly

const ReviewList = ({reviews, reviewCount, sortOrder, handleSortChange}) => {
  return (
    <main>
      <div className="list-controls">
        {`${reviewCount} reviews, sorted by`}
        <select value={sortOrder} onChange={handleSortChange}>
          <option value='relevant'>relevance</option>
          <option value='helpful'>helpfulness</option>
          <option value='newest'>newest</option>
        </select>
      </div>
      <div className="card-container">
        {reviews.map((review, index) => {
          return (
            <ReviewCard
              key={review.review_id}
              review={review}
              index={index}
            />
          );
        })}
      </div>
      <div>
        <button>More Reviews</button>
        <button>Add A Review</button>
      </div>
    </main>
  );
};

export default ReviewList;
