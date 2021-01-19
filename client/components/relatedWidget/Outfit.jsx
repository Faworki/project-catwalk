import React from 'react';
import ScrollMenu from 'react-horizontal-scrolling-menu';
import ProductList from './ProductList.jsx';
import ArrowButton from './ArrowButton.jsx';
import AddButton from './AddButton';
import axios from 'axios';

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
      image: [],
      selected: selected
    };
    this.productItems = ProductList(
      {
        products: this.props.yourOutfit,
        images: this.state.image
      },
        this.state.selected,
        this.props.addToOutfit);
    this.onSelect = this.onSelect.bind(this);
  }

  getImage (productId) {
    axios.get(`/api/fec2/hrnyc/products/${productId}/styles`)
    .then(results=>{
      this.setState({image: results.data});
    })
    .catch(err=>{
      console.log(err);
    });
  }

  onSelect(key) {
    this.setState({ selected: key });
  }

  buildCarousel() {
  this.productItems = new ProductList(
    {
      products: this.props.yourOutfit,
      images: this.state.image
    },
      this.state.selected,
      this.props.addToOutfit);
  }

  componentDidMount() {
    console.log(this.props.product)
    this.getImage(this.props.product.id);
    this.buildCarousel();
  }

  componentDidUpdate(prevProps) {
    // if (this.props.yourOutfit !== prevProps.yourOutfit) {
      this.getImage(this.props.product.id);
      this.buildCarousel();
    // }
  }

  render() {
    return (
      <div>
        Outfit Carousel
        <AddButton
        yourOutfit={this.props.outfit}
        addToOutfit={this.props.addToOutfit}
        />
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

export default Outfit;
