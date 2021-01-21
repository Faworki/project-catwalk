import React from 'react';
import StarAverage from '../shared/StarAverage.jsx';

class ProductListItem extends React.Component {
  constructor(props) {
    super(props);
  }

  render () {
    return (<div
      onClick={()=>{
        this.props.getNewProduct(this.props.text.id);
      }}
      className={`menu-item`}
      >
        <h4>{this.props.text.category}</h4>
        <h4>{this.props.text.name}</h4>
        <img src={this.props.image} width='200' height='250'/>
        <h4>{this.props.text.default_price}</h4>
        <StarAverage/>
      </div>);
  }
}

export default ProductListItem;