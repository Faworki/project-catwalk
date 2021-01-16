import React from 'react';

class ProductCard extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
        {this.props.product.name}
        <br/>
        Click to check me out!
      </div>
    );
  }
}

export default ProductCard;