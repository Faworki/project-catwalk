import React from 'react';
import ProductCard from './ProductCard.jsx';

class RelatedCarousel extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
        <h5>Related Products Carousel</h5>
        {
          this.props.relatedProducts.map((product)=>{
            return <ProductCard product={product}/>;
          })
        }
      </div>
    );
  }
}

export default RelatedCarousel;