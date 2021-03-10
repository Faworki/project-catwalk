import React from 'react';
import StarAverage from '../shared/StarAverage.jsx';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import ActionButton from './ActionButton.jsx';

class ProductListItem extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    var page = '/' + this.props.text.id;
    return (
      // <div
      //   onClick={()=>{
      //     this.props.getNewProduct(this.props.text.id);
      //   }}
      //  className={'menu-item'}
      // >
      <div className={'menu-item'}>
        <h4>{this.props.text.category}</h4>
        <Link exact to={page}>
          <h4>{this.props.text.name}</h4>
        </Link>
        <img src={this.props.image} width="200" height="250" />
        <h4>${this.props.text.default_price}</h4>
        <StarAverage reviewAverage={this.props.stars} />
        <ActionButton
          buttonCallback={this.props.buttonCallback}
          productId={this.props.text.id}
        />
      </div>

      // <Route component={Home} />
    );
  }
}

export default ProductListItem;
