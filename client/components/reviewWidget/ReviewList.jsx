import React, { useState } from 'react';
import ReviewCard from './ReviewCard';
import AddReviewModal from './AddReviewModal.jsx';

// todo: Look in to making select element accessible friendly

const ReviewList = ({
  reviews,
  reviewCount,
  sortOrder,
  handleSortChange,
  handleMoreReviewsClick,
  showMoreReviewsButton,
  markReviewHelpful,
  reportReview,
}) => {

  const [showModal, setShowModal] = useState(false);

  return (
    <main>
      <div className="list-controls">
        <label htmlFor="sort">{`${reviewCount} reviews, sorted by`}</label>
        <select value={sortOrder} onChange={handleSortChange} name="sort">
          <option value="relevant">relevance</option>
          <option value="helpful">helpfulness</option>
          <option value="newest">newest</option>
        </select>
      </div>
      <div className="card-container">
        {reviews.map((review, index) => {
          return (
            <ReviewCard
              key={review.review_id}
              review={review}
              index={index}
              markReviewHelpful={markReviewHelpful}
              reportReview={reportReview}
            />
          );
        })}
      </div>
      <div className="list-footer">
        {showMoreReviewsButton ? (
          <button onClick={handleMoreReviewsClick}>More Reviews</button>
        ) : null}
        <button
          onClick={() => { setShowModal(true); }}
        >Add A Review +</button>
      </div>
      <AddReviewModal
        showModal={showModal}
        closeModal={()=>{ setShowModal(false); }}
      />
    </main>
  );
};

export default ReviewList;
