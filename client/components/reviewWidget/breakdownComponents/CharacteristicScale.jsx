import React, {useRef, useEffect, useState} from 'react';

const CharacteristicScale = ({ valuePercent, name, labels }) => {
  // Using react hooks here to get the width of the pointer
  // To properly place the pointer its left-margin needs to be
  // set to valuePercent but then half the width of the pointer
  // needs to be subtracted.

  // This creates a way to reference the pointer DOM element
  const pointerRef = useRef(null);

  // This creates a place to store the width
  const [pointerWidth, setPointerWidth] = useState(0);

  // Once the page renders this will get the width of the pointer
  // and set it as 'pointerWidth'.
  useEffect(() => {
    setPointerWidth(pointerRef.current.offsetWidth);
  }, [pointerRef.current]);

  return (
    <article className="char-scale">
      <h5>{name}</h5>
      <div className="scale">
        <div className="scale-bar">
          <div></div>
          <div></div>
          <div></div>
          <div></div>
        </div>
        <span ref={pointerRef} className="pointer"
        style={{marginLeft: `calc(${valuePercent}% - ${pointerWidth / 2}px)`}}>▼</span>
      </div>
      <div className="char-labels">
        {labels.map((label) => (
          <span key={name + label}>{label}</span>
        ))}
      </div>
    </article>
  );
};

export default CharacteristicScale;
