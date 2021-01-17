import React from 'react';

const ReviewBar = ({starNum, percentOfRatings}) => {
  return (
    <article className="review-bar">
      <div>{starNum + ' stars'}</div><div>{percentOfRatings + '%'}</div>
    </article>
  );
};

export default ReviewBar;
