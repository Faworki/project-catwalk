import React from 'react';

const CharacteristicScale = ({ valuePercent, name, labels }) => {
  return (
    <article className="char-scale">
      <h5>{name}</h5>
      <div className="scale">
        <div className="scale-bar"></div>
        <div className="scale-bar"></div>
        <div className="scale-bar"></div>
        <div className="scale-bar"></div>
        <span className="pointer">▼</span>
      </div>
      <div>
        {labels.map((label) => (
          <h6 key={name + label}>{label}</h6>
        ))}
      </div>
    </article>
  );
};

export default CharacteristicScale;
