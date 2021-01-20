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
      let imageArray = this.state.image.slice();
      imageArray.push(results.data.results[0].photos[0].thumbnail_url);
      this.setState({image: imageArray});
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
    // this.getImage(this.props.product.id);
    this.buildCarousel();
  }

  componentDidUpdate(prevProps) {
    if (this.props.yourOutfit.length !== prevProps.yourOutfit.length) {
      this.getImage(this.props.product.id);
      this.buildCarousel();
    }
  }

  render() {
    return (
      <div>
        Outfit Carousel
        <ScrollMenu
          data={[
            <AddButton
              product={this.props.product}
              yourOutfit={this.props.yourOutfit}
              addToOutfit={this.props.addToOutfit}
            />,
            ...this.productItems
          ]}
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
