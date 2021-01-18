import React from 'react';
/**
 * This component expects a prop called 'reviewAverage'
 * that sould be a number between 0 and 5.
 *
 * Ex: <StarAverage reviewAverage={3.5}
 *     <StarAverage reviewAverage={this.props.reviewAverage}
 * */

const StarAverage = ({reviewAverage}) => {
  return (
    <div className="star-container">
      {reviewAverage + ' Stars'}
    </div>
  );
};

export default StarAverage;
