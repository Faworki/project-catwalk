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
      selectedStyleName: ''
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
            selectedStyleName: data.results[0].name
          });
        })
        .catch((err) => {
          console.error(err);
        });
    }
  }

  clickedStyleHandler(e) {
    const newStyle = this.state.styles.filter((style) => {
      return style.style_id === parseInt(e.target.id);
    });
    this.setState({
      selectedStyle: e.target.id,
      selectedStyleName: newStyle[0].name
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
            selectedStyleName={this.state.selectedStyleName}
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
