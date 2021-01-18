import React from 'react';
import ScrollMenu from 'react-horizontal-scrolling-menu';
import ProductList from './ProductList.jsx';
import ArrowButton from './ArrowButton.jsx';
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

class RelatedCarousel extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selected: selected,
      relatedProducts: []
    };
    this.productItems = ProductList(this.state.relatedProducts, this.state.selected);
    this.onSelect = this.onSelect.bind(this);
  }

  onSelect(key) {
    this.setState({ selected: key });
  }

// componentDidUpdate(prevProps) {
//   if (this.props.relatedProducts !== prevProps.relatedProducts) {
//     this.productItems = ProductList(this.props.relatedProducts, this.state.selected);
//   }
// }

  componentDidMount() {
    axios.get('/api/fec2/hrnyc/products/11001/related')
    .then(results=>{
      return results.data.map(relatedId=>{
        return axios.get(`/api/fec2/hrnyc/products/${relatedId}`);
      });
    })
    .then(results=>{
      Promise.all(results)
      .then(results=>{
        return results.map((res)=>{
          return res.data;
        });
      })
      .then(results=>{
        this.setState({relatedProducts: results});
        return results;
      })
      .then(results=>{
        this.productItems = ProductList(this.state.relatedProducts, this.state.selected);
        console.log('this.productItems:', this.productItems)
      })
      .catch(err=>{ console.log('Promise.all error'); });
    })
    .catch(err=>{
      console.log('componentDidMount Error');
    });
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