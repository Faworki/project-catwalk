import React, {useRef, useEffect, useState} from 'react';

const CharacteristicScale = ({ valuePercent, name, labels }) => {
  const pointerRef = useRef(null);

  const [pointerWidth, setPointerWidth] = useState(0);

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
