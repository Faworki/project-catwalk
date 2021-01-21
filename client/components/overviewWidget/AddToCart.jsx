import React from 'react';
import axios from 'axios';
import './styles/OverviewStyles.scss';


class AddToCart extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      product: null,
      styles: [],
      selectedStyle: null,
      sizes: [],
      selectedSize: '',
      selectedSizeQuantities: []
    };

    this.sizeSelectorClickHandler = this.sizeSelectorClickHandler.bind(this);
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
      skus.forEach((sku) => {
        sizes.push(sku.size);
      });
      this.setState({
        selectedStyle: newSelectedStyleData[0],
        sizes
      });
      this.sizeSelectorClickHandler({ target: { value: 'select-size' } });
    }
  }

  sizeSelectorClickHandler(e) {
    const selectedSize = e.target.value;
    if (selectedSize === 'select-size') {
      this.setState({
        selectedSizeQuantities: []
      });
    } else {
      const selectedStyle = this.state.selectedStyle;
      const selectedSku = Object.values(selectedStyle.skus).filter((sku) => {
        return sku.size === selectedSize;
      });
      const selectedSizeQuantity = selectedSku[0].quantity;
      const maxAvailableQuantity = Math.min(selectedSizeQuantity, 15);
      const availableQuantities = [];
      for (let i = 1; i <= maxAvailableQuantity; i++) {
        availableQuantities.push(i);
      }
      this.setState({
        selectedSizeQuantities: availableQuantities
      });
    }
  }

  addToBagHandler(e) {
    e.preventDefault();
    console.log('Item added to bag!');
  }

  render () {
    return (
      <div className="add-to-cart">
        <br />
        <form>
          <select className="btn" id="select-size" name="select-size" onChange={this.sizeSelectorClickHandler}>
            <option value="select-size">SELECT SIZE</option>
            {this.state.sizes.map((size, index) => {
              return <option key={index} value={size}>{size}</option>;
            })}
          </select>{' '}
          <select className="btn" id="quantity" name="quantity">
            <option value="-"> - </option>
            {this.state.selectedSizeQuantities.map((quantity, index) => {
              return <option key={index} value={quantity}>{quantity}</option>;
            })}
          </select><br /><br />
          <button className="btn" onClick={this.addToBagHandler}><span className="add-to-bag-span">ADD TO BAG</span><span>&#43;</span></button>{' '}
        </form><br />
      </div>
    );
  }
}

export default AddToCart;