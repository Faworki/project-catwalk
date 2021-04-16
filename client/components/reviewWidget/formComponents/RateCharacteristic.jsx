import React from 'react';

export default function RateCharacteristic({ characteristic, ratings }) {

  return (
    <div className="char-radio">
      <p>{characteristic}</p>
      {ratings.map((rating) => {
        return (
          <label>
          <input type="radio" name={characteristic} value={rating} />
          {rating}</label>
        );
      })}
    </div>
  );
}
