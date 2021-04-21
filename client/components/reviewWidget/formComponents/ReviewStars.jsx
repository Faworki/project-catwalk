import React, { useState } from 'react';

export default function ReviewStars({ currentValue, handleInputChange }) {
  const [hover, setHover] = useState(0);
  return (
    <>
      <h4>Product Rating</h4>
      <span id="star-radio-group">
        {[...Array(5)].map((el, rating) => {
          rating += 1;
          return (
            <label
              key={rating}
              onMouseOver={() => {
                setHover(rating);
              }}
              onMouseOut={() => {
                setHover(null);
              }}
              onClick={handleInputChange}
            >
              {currentValue >= rating || hover >= rating ? '★' : '☆' }
              <input type="radio" name="rating" value={rating} />
            </label>
          );
        })}
      </span>
    </>
  );
}
