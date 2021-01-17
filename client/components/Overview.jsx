import React from 'react';
import ImageGallery from './overviewWidget/ImageGallery.jsx';
import ProductInformation from './overviewWidget/ProductInformation.jsx';
import StyleSelector from './overviewWidget/StyleSelector.jsx';
import AddToCart from './overviewWidget/AddToCart.jsx';
import ProductOverview from './overviewWidget/ProductOverview.jsx';
// import axios from 'axios';

class Overview extends React.Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  componentDidMount() {}

  render () {
    return (
      <div>
        <ImageGallery />
        <ProductInformation />
        <StyleSelector />
        <AddToCart />
        <ProductOverview />
      </div>
    );
  }
}

export default Overview;