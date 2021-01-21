import React from 'react';

const ReviewBar = ({rating, percentOfRatings, toggleRatingFilter}) => {
  return (
    <article
      className="review-bar"
      onClick={() => { toggleRatingFilter(rating); }}
    >
      <span>{rating + ' stars'}</span>
      <div className="star-bar">
        <div className="star-bar-filled" style={{width: percentOfRatings + '%'}}></div>
      </div>
    </article>
  );
};

export default ReviewBar;
