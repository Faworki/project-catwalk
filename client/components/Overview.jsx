import React from 'react';
import ImageGallery from './overviewWidget/ImageGallery.jsx';
import ProductInformation from './overviewWidget/ProductInformation.jsx';
import StyleSelector from './overviewWidget/StyleSelector.jsx';
import AddToCart from './overviewWidget/AddToCart.jsx';
import ProductOverview from './overviewWidget/ProductOverview.jsx';
import axios from 'axios';

class Overview extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      styles: [],
      selectedStyle: null,
    };

    this.clickedStyleHandler = this.clickedStyleHandler.bind(this);
  }

  componentDidUpdate(prevProps) {
    if (this.props.product !== prevProps.product) {
      axios
        .get(`/api/fec2/hrnyc/products/${this.props.product.id}/styles`)
        .then(({ data }) => {
          this.setState({
            styles: data.results,
          });
        })
        .catch((err) => {
          console.error(err);
        });
    }
  }

  clickedStyleHandler(e) {
    this.setState({
      selectedStyle: e.target.id,
    });
  }

  render() {
    return (
      <div className="main-grid">
        <ImageGallery
          product={this.props.product}
          selectedStyle={this.state.selectedStyle}
        />
        <div>
          <ProductInformation
            product={this.props.product}
            reviewMetaData={this.props.reviewMetaData}
            reviewAverage={this.props.reviewAverage}
            styles={this.state.styles}
            selectedStyle={this.state.selectedStyle}
          />
          <StyleSelector
            product={this.props.product}
            styles={this.state.styles}
            selectedStyle={this.state.selectedStyle}
            clickedStyleHandler={this.clickedStyleHandler}
          />
          <AddToCart
            product={this.props.product}
            selectedStyle={this.state.selectedStyle}
          />
        </div>
        <ProductOverview product={this.props.product} />
      </div>
    );
  }
}

export default Overview;
