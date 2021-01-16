import React from 'react';
import StarAverage from '../../shared/StarAverage.jsx';

const ReviewsSummary = () => {
  return (
    <section>
      <article>
        <h2 className="review-average">3.5</h2>
        <StarAverage />
        <p>Based on XXX reviews</p>
      </article>
      <article>
      <p>XX% of reviewers recommend this product</p>
      </article>
    </section>
  );
};

export default ReviewsSummary;
