import React from 'react';
import AddButton from './AddButton';
import ProductCard from './ProductCard.jsx';

class Outfit extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
        Outfit Carousel
        <AddButton addToOutfit={this.props.addToOutfit}/>
        {
        this.props.yourOutfit.map((product)=>{
          return <ProductCard product={product}/>;
        })
        }
      </div>
    );
  }
}

export default Outfit;
