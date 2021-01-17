import React from 'react';
import ScrollMenu from 'react-horizontal-scrolling-menu';
import RelatedCarousel from './relatedWidget/RelatedCarousel.jsx';
import Outfit from './relatedWidget/Outfit.jsx';
import axios from 'axios';

//start README example code

// One item component
// selected prop will be passed
const MenuItem = ({text, selected}) => {
  return <div
    className={`menu-item ${selected ? 'active' : ''}`}
    >{text}</div>;
};

// All items component
// Important! add unique key
export const Menu = (list, selected) =>
  list.map(el => {
    const {name} = el;

    return <MenuItem text={name} key={name} selected={selected} />;
  });


const Arrow = ({ text, className }) => {
  return (
    <div
      className={className}
    >{text}</div>
  );
};


const ArrowLeft = Arrow({ text: '<', className: 'arrow-prev' });
const ArrowRight = Arrow({ text: '>', className: 'arrow-next' });

const selected = 'item1';

//end README example code

class RelatedProducts extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      relatedIDs: [],
      relatedProducts: [{name: 'Product 1'}, {name: 'Product 2'}, {name: 'Product 3'}],
      selected: selected
    };
    this.menuItems = Menu(this.state.relatedProducts, selected);
    this.onSelect = this.onSelect.bind(this);
  }

  componentDidMount() {
    //needs to send a GET request for each related product ID and populate it with that product data
    console.log('RELATED PRODUCTS COMPONENT MOUNTED!');
  }

  onSelect(key) {
    this.setState({ selected: key });
  }

  render () {
    const { selected } = this.state;
    // Create menu from items
    const menu = this.menuItems;

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
        <ScrollMenu
          data={menu}
          arrowLeft={ArrowLeft}
          arrowRight={ArrowRight}
          selected={selected}
          onSelect={this.onSelect}
        />
      </div>
    );
  }
}

export default RelatedProducts;