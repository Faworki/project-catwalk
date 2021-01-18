import React from 'react';

const ProductListItem = ({text, selected}) => {
  return <div
    className={`menu-item ${selected ? 'active' : ''}`}
    >{text.name}</div>;
};

export default ProductListItem;