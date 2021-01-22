import React from 'react';
import ProductListItem from './ProductListItem.jsx';

const ProductList = (list, callback, buttonCallback, stars) => {
  return list.products.map((product, index) => {
    return <ProductListItem
    text={product}
    image={list.images[index]}
    key={product.name}
    getNewProduct={callback}
    buttonCallback={buttonCallback}
    stars={stars}
    />;
  });
};

export default ProductList;