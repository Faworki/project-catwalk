import React from 'react';
import ProductListItem from './ProductListItem.jsx';

const ProductList = (list, selected) =>
  list.map(product => {
    console.log('product:', product)
    return <ProductListItem text={product} key={product.name} selected={selected} />;
  });

export default ProductList;