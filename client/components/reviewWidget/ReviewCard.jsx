import React from 'react';
import StarAverage from '../shared/StarAverage.jsx';

const ReviewCard = () => {
  return (
    <section className="review-card">
      <div className="review-header">
        <StarAverage />
        <p>Username, January 1, 2019</p>
      </div>
      <div className="review-summary">
        <h5>This is the review summary</h5>
      </div>
      <div className="review-body">
        <p>This is the review text</p>
        <div className="review-images">
          Review Images
        </div>
        <div className="review-recommended">
          I recommended this product
        </div>
        <div className="review-response">
          <h6>Response:</h6>
          <p>So glad that you loved our product! Come again and tell all your friends</p>
        </div>
        <div className="review-footer">
          <div>Helpful?</div>
          <div>Report</div>
        </div>
      </div>

    </section>
  );
};

export default ReviewCard;
