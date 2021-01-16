import React from 'react';
import RelatedCarousel from './relatedWidget/RelatedCarousel.jsx';
import Outfit from './relatedWidget/Outfit.jsx';
import axios from 'axios';

class RelatedProducts extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      relatedIDs: [],
      relatedProducts: [{name: 'Product 1'}, {name: 'Product 2'}, {name: 'Product 3'}]
    };
  }

  componentDidMount() {
    //needs to send a GET request for each related product ID and populate it with that product data
    console.log('RELATED PRODUCTS COMPONENT MOUNTED!');
  }

  render () {
    return (
      <div>
        <strong>RELATED PRODUCTS</strong>
        <RelatedCarousel
        relatedProducts={this.state.relatedProducts}
        />
        <Outfit yourOutfit={this.props.yourOutfit}/>
      </div>
    );
  }
}

export default RelatedProducts;