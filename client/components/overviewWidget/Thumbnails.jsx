import React from 'react';

const Thumbnails = props => {
  return (
      <img
        src={props.thumbnail}
        alt="Thumbnail"
        width="60"
        height="90"
        onClick={props.thumbnailClickHandler}
      />
  );
};

export default Thumbnails;