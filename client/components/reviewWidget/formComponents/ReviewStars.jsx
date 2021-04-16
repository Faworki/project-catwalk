import React from 'react';

export default function ReviewStars({ currentValue, handleInputChange }) {
  return (
    <>
      <h4>Star Rating</h4>
      <span className="star-cb-group">
        {[...Array(5)].map((el, i) => {
          return (
            <label key={i}>☆
              <input type="radio" name="rating" value={i} />
            </label>
          );
        })}
      </span>
    </>
  );
}
