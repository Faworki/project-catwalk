import React from 'react';
import ScrollMenu from 'react-horizontal-scrolling-menu';
import ProductList from './ProductList.jsx';
import ProductCard from './ProductCard.jsx';
import ArrowButton from './ArrowButton.jsx';

const selected = null;
const ArrowLeft = ArrowButton({
  text: '<',
  className: 'arrow-prev'
});
const ArrowRight = ArrowButton({
  text: '>',
  className: 'arrow-next'
});

class RelatedCarousel extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selected: selected
    };
    this.productItems = ProductList(this.props.relatedProducts, selected);
    this.onSelect = this.onSelect.bind(this);
  }

  onSelect(key) {
    this.setState({ selected: key });
  }

  render() {
    const { selected } = this.state;

    return (
      <div>
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

export default RelatedCarousel;