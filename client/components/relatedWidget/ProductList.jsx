import React from 'react';
import ProductListItem from './ProductListItem.jsx';

const ProductList = (list, selected) =>
  list.map(product => {
    return <ProductListItem text={product.name} key={product.name} selected={selected} />;
  });

export default ProductList;