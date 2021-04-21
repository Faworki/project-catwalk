import React from 'react';

export default function RateCharacteristic({
  characteristic,
  ratings,
  handleInputChange,
  currentValue,
  isNotValid,
}) {
  return (
    <div className="char-radio">
      <h4 style={isNotValid ? { color: 'red' } : {}}>{characteristic}</h4>
      <div className="radio-options">
        {ratings.map((rating, i) => {
          return (
            <label key={characteristic + (i + 1)}>
              <input
                type="radio"
                name={characteristic}
                value={i + 1}
                checked={rating === ratings[currentValue - 1]}
                onChange={handleInputChange}
              />
              {rating}
            </label>
          );
        })}
      </div>
    </div>
  );
}
