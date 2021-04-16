import React from 'react';

export default function RateCharacteristic({ characteristic, ratings, handleInputChange, currentValue }) {
  return (
    <div className="char-radio">
      <h4>{characteristic}</h4>
      {ratings.map((rating) => {
        return (
          <label key={characteristic + rating}>
            <input
              type="radio"
              name={characteristic}
              value={rating}
              checked={rating === currentValue}
              onChange={handleInputChange}
            />
            {rating}
          </label>
        );
      })}
    </div>
  );
}
