import React from 'react';
import Styles from './Styles.jsx';

const StyleSelector = (props) => {
  return (
    <div className="style-selector">
      <span><small><b>STYLE &gt;</b></small></span>{' '}<span>{props.selectedStyleName}</span>
      <div className="styles-container">
        {props.styles.map((style) => {
          return (<Styles
            key={style.style_id}
            styleId={style.style_id}
            thumbnail={style.photos[0].thumbnail_url}
            clickedStyleHandler={props.clickedStyleHandler}
          />);
        })}
      </div>
    </div>
  );
};

export default StyleSelector;