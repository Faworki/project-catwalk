import React from 'react';
import RelatedCarousel from './relatedWidget/RelatedCarousel.jsx';
import Outfit from './relatedWidget/Outfit.jsx';
import axios from 'axios';

class RelatedProducts extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      relatedIDs: [],
      relatedProducts: [{name: 'Product 1'}, {name: 'Product 2'}, {name: 'Product 3'}, {name: 'Product 4'}, {name: 'Product 5'}, {name: 'Product 6'}, {name: 'Product 7'}]
    };
  }

  componentDidMount() {
    console.log('RELATED PRODUCTS COMPONENT MOUNTED!');
    axios.get('/api/fec2/hrnyc/products/11001/related')
    .then(results=>{
      return results.data.map(relatedId=>{
        return axios.get(`/api/fec2/hrnyc/products/${relatedId}/styles`);
      });
    })
    .then(results=>{
      Promise.all(results)
      .then(results=>{
        return results.map((res)=>{
          return res.data;
        });
      })
      .then(results=>{
        this.setState({relatedProducts: results});
      })
      .catch(err=>{ console.log('Promise.all error'); });
    })
    .catch(err=>{
      console.log('Related Products Error');
    });
  }

  render () {
    return (
      <div>
        <strong>RELATED PRODUCTS</strong>
        <RelatedCarousel
        relatedProducts={this.state.relatedProducts}
        />
        <Outfit
        yourOutfit={this.props.yourOutfit}
        addToOutfit={this.props.addToOutfit}
        />
      </div>
    );
  }
}

export default RelatedProducts;