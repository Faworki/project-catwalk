import React from 'react';

const CharacteristicScale = ({ valuePercent, name, labels }) => {
  return (
    <article className="char-scale">
      <h5>{name}</h5>
      <div>{valuePercent + '%'}</div>
      {labels.map((label) => (
        <h6 key={name + label}>{label}</h6>
      ))}
    </article>
  );
};

export default CharacteristicScale;
