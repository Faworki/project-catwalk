import React from 'react';
import ProductListItem from './ProductListItem.jsx';

const ProductList = (list, selected, callback) => {
  return list.products.map((product, index) => {
    return <ProductListItem
    text={product}
    image={list.images[index]}
    key={product.name}
    selected={selected}
    getNewProduct={callback}
    />;
  });
};

export default ProductList;