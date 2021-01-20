import React, {useRef, useEffect, useState} from 'react';

const CharacteristicScale = ({ valuePercent, name, labels }) => {
  const pointerRef = useRef(null);

  const [pointerWidth, setPointerWidth] = useState(0);

  useEffect(() => {
    console.log('width', pointerRef.current ? pointerRef.current.offsetWidth : 0);
    setPointerWidth(pointerRef.current.offsetWidth);
  }), [];

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
      <div>
        {labels.map((label) => (
          <h6 key={name + label}>{label}</h6>
        ))}
      </div>
    </article>
  );
};

export default CharacteristicScale;
