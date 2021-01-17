import React from 'react';
// import axios from 'axios';

class AddToCart extends React.Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  componentDidMount() {}

  render () {
    return (
      <div>
        <br />
        <form>
          <select id="select-size" name="select-size">
            <option value="select-size">SELECT SIZE</option>
            <option value="S">S</option>
            <option value="M">M</option>
            <option value="L">L</option>
            <option value="XL">XL</option>
          </select>{' '}
          <select id="quantity" name="quantity">
            <option value="-"> - </option>
            <option value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
            <option value="4">4</option>
            <option value="5">5</option>
          </select><br /><br />
          <button type="button">ADD TO BAG &#43;</button>{' '}
          <button type="button">&#9734;</button>
        </form><br />
      </div>
    );
  }
}

export default AddToCart;