import React from 'react';

const ReviewBar = ({starNum, percentOfRatings}) => {
  return (
    <article className="review-bar">
      <span>{starNum + ' stars'}</span>
      <div className="star-bar">
        <div className="star-bar-filled" style={{width: percentOfRatings + '%'}}></div>
      </div>
    </article>
  );
};

export default ReviewBar;
