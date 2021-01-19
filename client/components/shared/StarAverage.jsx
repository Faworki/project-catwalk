import React from "react";
/**
 * This component expects a prop called 'reviewAverage'
 * that sould be a number between 0 and 5.
 *
 * Ex: <StarAverage reviewAverage={3.5}
 *     <StarAverage reviewAverage={this.props.reviewAverage}
 * */

const StarAverage = ({ reviewAverage }) => {
  let reviewPercent = Math.round(reviewAverage / 25 * 100) * 5 + '%';
  debugger;
  return (
    <div className="star-container">
      <span className="stars-empty">☆☆☆☆☆</span>
      <span className="stars-filled" style={{width: reviewPercent}}>
        ★★★★★
      </span>
    </div>
  );
};

export default StarAverage;
