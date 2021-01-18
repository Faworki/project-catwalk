import React from 'react';
import ProductListItem from './ProductListItem.jsx';

const ProductList = (list, selected) =>
  list.map(el => {
    const {name} = el;

    return <ProductListItem text={name} key={name} selected={selected} />;
  });

export default ProductList;