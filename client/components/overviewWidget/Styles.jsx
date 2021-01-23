import React from 'react';

const Styles = props => {
  return (
      <img
        className="styles"
        id={props.styleId}
        src={props.thumbnail}
        alt="Thumbnail"
        width="70"
        height="70"
        onClick={props.clickedStyleHandler}
      />
  );
};

export default Styles;