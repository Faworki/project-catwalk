import React from 'react';
import ProductListItem from './ProductListItem.jsx';

const ProductList = (list, selected) => {
  // console.log('list:', list);
  return list.products.map((product, index) => {
    // console.log('product:', list.images[index]);
    return <ProductListItem
    text={product}
    image={list.images[index]}
    key={product.name}
    selected={selected} />;
  });
};

export default ProductList;