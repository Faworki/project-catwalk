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
    </div>
  );
}
