import React from 'react';
import ScrollMenu from 'react-horizontal-scrolling-menu';
import ProductList from './ProductList.jsx';
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
    this.productItems = ProductList(this.props.relatedProducts, this.state.selected);
    this.onSelect = this.onSelect.bind(this);
  }

  onSelect(key) {
    this.setState({ selected: key });
  }

componentDidUpdate(prevProps) {
  if (this.props.relatedProducts !== prevProps.relatedProducts) {
    this.productItems = ProductList(this.props.relatedProducts, this.state.selected);
  }
}

  render() {
    return (
      <div>
        <ScrollMenu
          data={this.productItems}
          arrowLeft={ArrowLeft}
          arrowRight={ArrowRight}
          selected={selected}
          onSelect={this.onSelect}
          alignCenter={false}
          wheel={false}
          hideArrows={true}
          arrowDisabledClass='scroll-menu-arrow--disabled'
          hideSingleArrow={true}
        />
      </div>
    );
  }
}

export default RelatedCarousel;