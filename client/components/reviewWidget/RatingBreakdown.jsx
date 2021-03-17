import React from 'react';
import ReviewsSummary from './breakdownComponents/ReviewsSummary.jsx';
import ReviewsBreakdown from './breakdownComponents/ReviewsBreakdown.jsx';
import CharacteristicsBreakdown from './breakdownComponents/CharacteristicsBreakdown.jsx';

const RatingBreakdown = ({
  reviewAverage,
  reviewMetaData,
  reviewCount,
  toggleRatingFilter,
  reviewFilters,
}) => {
  return (
    <aside className="breakdown-container">
      <ReviewsSummary
        reviewAverage={reviewAverage}
        recommended={reviewMetaData.recommended}
        reviewCount={reviewCount}
      />
      <ReviewsBreakdown
        ratings={reviewMetaData.ratings}
        toggleRatingFilter={toggleRatingFilter}
        reviewFilters={reviewFilters}
      />
      <CharacteristicsBreakdown
        characteristics={reviewMetaData.characteristics}
      />
    </aside>
  );
};

export default RatingBreakdown;
