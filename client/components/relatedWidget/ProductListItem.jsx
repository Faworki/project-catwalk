import React from 'react';
import StarAverage from '../shared/StarAverage.jsx';
import { Link } from 'react-router-dom';
import ActionButton from './ActionButton.jsx';

class ProductListItem extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    var page = '/' + this.props.text.id;
    return (
      <div className={'menu-item'}>
        <h4>{this.props.text.category}</h4>
        <Link to={page}>
          <h4>{this.props.text.name}</h4>
        </Link>
        <img src={this.props.image} width="200" height="250" />
        <h4>${this.props.text.default_price}</h4>
        <StarAverage reviewAverage={this.props.stars} />
        <ActionButton
          buttonCallback={this.props.buttonCallback}
          buttonCallback2={this.props.buttonCallback2}
          productId={this.props.text.id}
          index={this.props.index}
        />
      </div>
    );
  }
}

export default ProductListItem;
