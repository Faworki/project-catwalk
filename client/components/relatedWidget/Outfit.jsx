import React from 'react';
import AddButton from './AddButton';
import ScrollMenu from 'react-horizontal-scrolling-menu';
import ProductCard from './ProductCard.jsx';

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

class Outfit extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selected: selected
    };
    this.menuItems = Menu(this.props.yourOutfit, selected);
    this.onSelect = this.onSelect.bind(this);
  }

  onSelect(key) {
    this.setState({ selected: key });
  }

  componentDidUpdate(prevProps) {
    // Typical usage (don't forget to compare props):
    if (this.props.yourOutfit !== prevProps.yourOutfit) {
      this.fetchData(this.props.yourOutfit);
    }
  }

  render() {
    const { selected } = this.state;
    // Create menu from items
    const menu = this.menuItems;

    return (
      <div>
        Outfit Carousel
        <AddButton yourOutfit={this.props.yourOutfit} addToOutfit={this.props.addToOutfit}/>
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

export default Outfit;
