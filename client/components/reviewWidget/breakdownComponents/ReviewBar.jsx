import React from 'react';

const ReviewBar = ({rating, percentOfRatings, toggleRatingFilter, active}) => {
  return (
    <article
      className="review-bar"
      onClick={() => { toggleRatingFilter(rating); }}
    >
      <span>{rating + ' stars'}</span>
      <div className="star-bar">
        <div className={active ? 'star-bar-filled active' : 'star-bar-filled'} style={{width: percentOfRatings + '%'}}></div>
      </div>
    </article>
  );
};

export default ReviewBar;
