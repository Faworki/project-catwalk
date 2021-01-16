import React from 'react';
import AddButton from './AddButton';

class Outfit extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
        Outfit Carousel
        <AddButton addToOutfit={this.props.addToOutfit}/>
      </div>
    );
  }
}

export default Outfit;
