import React from 'react';
import axios from 'axios';

class AddToCart extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      product: null,
      styles: [],
      selectedStyle: null,
      sizes: [],
      quantities: []
    };

    this.clickHandler = this.clickHandler.bind(this);
    this.addToBagHandler = this.addToBagHandler.bind(this);
  }

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
            selectedStyle: data.results[0],
            sizes,
            quantities
          });
        })
        .catch((err) => {
          console.error(err);
        });
    }

    if (this.props.selectedStyle !== prevProps.selectedStyle) {
      const newSelectedStyleData = this.state.styles.filter((style) => {
        return style.style_id === parseInt(this.props.selectedStyle);
      });
      let skus = Object.values(newSelectedStyleData[0].skus);
      let sizes = [];
      let quantities = [];
      skus.forEach((sku) => {
        sizes.push(sku.size);
        quantities.push(sku.quantity);
      });
      this.setState({
        selectedStyle: newSelectedStyleData[0],
        sizes,
        quantities
      });
    }
  }

  clickHandler(e) {
    console.log('obj.value: ', e.target.value);
  }

  addToBagHandler() {
    console.log('Item added to bag!');
  }

  render () {
    return (
      <div>
        <br />
        <form>
          <select id="select-size" name="select-size" onChange={this.clickHandler}>
            <option value="select-size">SELECT SIZE</option>
            {this.state.sizes.map((size, index) => {
              return <option key={index} value={size}>{size}</option>;
            })}
          </select>{' '}
          <select id="quantity" name="quantity">
            <option value="-"> - </option>
            {this.state.quantities.map((quantity, index) => {
              return <option key={index} value={quantity}>{quantity}</option>;
            })}
          </select><br /><br />
          <button type="button" onClick={this.addToBagHandler}>ADD TO BAG &#43;</button>{' '}
        </form><br />
      </div>
    );
  }
}

export default AddToCart;