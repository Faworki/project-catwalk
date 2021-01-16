import React from 'react';
import ReviewsSummary from './breakdownComponents/ReviewsSummary.jsx';
import ReviewsBreakdown from './breakdownComponents/ReviewsBreakdown.jsx';
import CharacteristicsBreakdown from './breakdownComponents/CharacteristicsBreakdown.jsx';

const RatingBreakdown = () => {
  return (
    <aside className='breakdown-container'>
      <ReviewsSummary />
      <ReviewsBreakdown />
      <CharacteristicsBreakdown />
    </aside>
  );
};

export default RatingBreakdown;
