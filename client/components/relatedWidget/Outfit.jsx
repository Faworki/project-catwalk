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
        <AddButton/>
      </div>
    );
  }
}

export default Outfit;
