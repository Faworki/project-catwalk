import React from 'react';
import RelatedCarousel from './relatedWidget/RelatedCarousel.jsx';
import Outfit from './relatedWidget/Outfit.jsx';
import axios from 'axios';

class RelatedProducts extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      relatedIDs: [],
      relatedProducts: []
    };
  }

  componentDidMount() {}

  render () {
    return (
      <div>
        <strong>RELATED PRODUCTS WIDGET</strong>
        <RelatedCarousel
        product={this.props.product}
        getNewProduct={this.props.getNewProduct}
        reviewAverage={this.props.reviewAverage}
        />
        <Outfit
        product={this.props.product}
        yourOutfit={this.props.yourOutfit}
        addToOutfit={this.props.addToOutfit}
        getNewProduct={this.props.getNewProduct}
        removeFromOutfit = {this.props.removeFromOutfit}
        styles = {this.props.styles}
        reviewAverage={this.props.reviewAverage}
        />
      </div>
    );
  }
}

export default RelatedProducts;