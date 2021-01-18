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

    this.clickedStyleHandler = this.clickedStyleHandler.bind(this);
  }

  componentDidMount() {}

  clickedStyleHandler(e) {
    this.setState({
      selectedStyle: e.target.id
    });
  }

  render () {
    return (
      <div>
        <ImageGallery
          product={this.props.product}
          selectedStyle={this.state.selectedStyle}
        />
        <ProductInformation
          product={this.props.product}
          reviewMetaData={this.props.reviewMetaData}
          reviewAverage={this.props.reviewAverage}
        />
        <StyleSelector
          product={this.props.product}
          selectedStyle={this.state.selectedStyle}
          clickedStyleHandler={this.clickedStyleHandler}
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