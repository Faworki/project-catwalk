import React from 'react';
import axios from 'axios';
import Sizes from './Sizes.jsx';
import Quantities from './Quantities.jsx';

class AddToCart extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      product: null,
      styles: [],
      sizes: [],
      quantities: []
    };
  }

  componentDidMount() {}

  componentDidUpdate(prevProps) {
    if (this.props.product !== prevProps.product) {
      axios.get(`/api/fec2/hrnyc/products/${this.props.product.id}/styles`)
        .then(({data}) => {
          let skus = Object.values(data.results[0].skus);
          let sizes = [];
          let quantities = [];
          skus.forEach((sku) => {
            sizes.push(sku.size);
            quantities.push(sku.quantity);
          });
          this.setState({
            product: this.props.product,
            styles: data.results,
            sizes,
            quantities
          });
        })
        .catch((err) => {
          console.error(err);
        });
    }
  }

  render () {
    return (
      <div>
        <br />
        <form>
          <select id="select-size" name="select-size">
            <option value="select-size">SELECT SIZE</option>
            {this.state.sizes.map((size, index) => {
              return <Sizes key={index} size={size}/>;
            })}
          </select>{' '}
          <select id="quantity" name="quantity">
            <option value="-"> - </option>
            {this.state.quantities.map((quantity, index) => {
              return <Quantities key={index} quantity={quantity}/>;
            })}
          </select><br /><br />
          <button type="button">ADD TO BAG &#43;</button>{' '}
          <button type="button">&#9734;</button>
        </form><br />
      </div>
    );
  }
}

export default AddToCart;