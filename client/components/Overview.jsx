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

    this.state = {
      selectedStyle: null
    };
  }

  componentDidMount() {}

  render () {
    return (
      <div>
        <ImageGallery product={this.props.product}/>
        <ProductInformation
          product={this.props.product}
          reviewMetaData={this.props.reviewMetaData}
          reviewAverage={this.props.reviewAverage}
        />
        <StyleSelector
          product={this.props.product}
        />
        <AddToCart
          product={this.props.product}
        />
        <ProductOverview
          product={this.props.product}
        />
      </div>
    );
  }
}

export default Overview;