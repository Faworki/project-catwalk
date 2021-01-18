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

  componentDidMount() {
    console.log('RELATED PRODUCTS COMPONENT MOUNTED!');
  }

  render () {
    return (
      <div>
        <strong>RELATED PRODUCTS WIDGET</strong>
        <RelatedCarousel product={this.props.product}/>
        {/* <Outfit
        yourOutfit={this.props.yourOutfit}
        addToOutfit={this.props.addToOutfit}
        /> */}
      </div>
    );
  }
}

export default RelatedProducts;