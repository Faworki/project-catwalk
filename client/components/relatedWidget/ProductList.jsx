import React from 'react';
import ProductListItem from './ProductListItem.jsx';

const ProductList = (list, callback, buttonCallback, stars, buttonCallback2 = ()=>{}) => {
  return list.products.map((product, index) => {
    return <ProductListItem
    text={product}
    image={list.images[index]}
    key={product.name}
    getNewProduct={callback}
    buttonCallback={buttonCallback}
    buttonCallback2={buttonCallback2}
    stars={stars}
    index={index}
    />;
  });
};

export default ProductList;