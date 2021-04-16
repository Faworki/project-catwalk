import React from 'react';

export default function ReviewStars({ currentValue, handleInputChange }) {
  return (
    <>
      <h4>Star Rating</h4>
      <span className="star-cb-group">
        <input type="radio" id="rating-5" name="star-rating" value="5" />
        <label htmlFor="rating-5">5</label>
        <input
          type="radio"
          id="rating-4"
          name="star-rating"
          value="4"
          // checked={true}
        />
        <label htmlFor="rating-4">4</label>
        <input type="radio" id="rating-3" name="star-rating" value="3" />
        <label htmlFor="rating-3">3</label>
        <input type="radio" id="rating-2" name="star-rating" value="2" />
        <label htmlFor="rating-2">2</label>
        <input type="radio" id="rating-1" name="star-rating" value="1" />
        <label htmlFor="rating-1">1</label>
        <input
          type="radio"
          id="rating-0"
          name="star-rating"
          value="0"
          className="star-cb-clear"
        />
        <label htmlFor="rating-0">0</label>
      </span>
    </>
  );
}
