import React from 'react';
import ScrollMenu from 'react-horizontal-scrolling-menu';
import ProductList from './ProductList.jsx';
import ArrowButton from './ArrowButton.jsx';
import AddButton from './AddButton';

const selected = null;
const ArrowLeft = ArrowButton({
  text: '<',
  className: 'arrow-prev'
});
const ArrowRight = ArrowButton({
  text: '>',
  className: 'arrow-next'
});

class Outfit extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      outfit: [],
      selected: selected
    };
    this.productItems = ProductList(this.props.yourOutfit, selected);
    this.onSelect = this.onSelect.bind(this);
  }

  onSelect(key) {
    this.setState({ selected: key });
  }

  componentDidUpdate(prevProps) {
    // Typical usage (don't forget to compare props):
    if (this.state.outfit !== prevProps.yourOutfit) {
      console.log('inside componentDidUpdate');
      this.productItems = Menu(this.props.yourOutfit, selected);
    }
  }

  render() {

    return (
      <div>
        Outfit Carousel
        <AddButton yourOutfit={this.props.outfit} addToOutfit={this.props.addToOutfit}/>
        <ScrollMenu
          data={this.productItems}
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
