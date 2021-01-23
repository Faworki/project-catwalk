import React from 'react';

const Thumbnails = props => {
  return (
    <div>
      <img
      className="thumbnails"
        src={props.thumbnail}
        alt="Thumbnail"
        width="60"
        height="90"
        onClick={props.thumbnailClickHandler}
      />{' '}
    </div>
  );
};

export default Thumbnails;