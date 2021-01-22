import React from 'react';
import StarAverage from '../shared/StarAverage.jsx';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  NavLink
} from "react-router-dom";
import ActionButton from './ActionButton.jsx';


class ProductListItem extends React.Component {
  constructor(props) {
    super(props);
  }

  render () {
    var page = '/'+this.props.text.id;
    return (
      <NavLink exact to={page}>
        <div
          onClick={()=>{
            this.props.getNewProduct(this.props.text.id);
          }}
         className={'menu-item'}
        >
        <h4>{this.props.text.category}</h4>
        <h4>{this.props.text.name}</h4>
        <img src={this.props.image} width='200' height='250'/>
        <h4>${this.props.text.default_price}</h4>
        <StarAverage reviewAverage={this.props.stars}/>
        <ActionButton
          buttonCallback={this.props.buttonCallback}
          productId={this.props.text.id}
        />
      </div>
      </NavLink>
      // <Route component={Home} />
    );
  }
}

export default ProductListItem;