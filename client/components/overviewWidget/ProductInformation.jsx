import React from 'react';
import StarAverage from '../shared/StarAverage.jsx';
import axios from 'axios';

class ProductInformation extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      reviewCount: 0,
      defaultPrice: null,
      salePrice: null
    };
  }

  componentDidUpdate(prevProps) {
    if (this.props.product !== prevProps.product) {
      let ratings = this.props.reviewMetaData.ratings;
      let totalRatings = 0;
      for (let rating in ratings) {
        totalRatings += parseInt(ratings[rating]);
      }
      this.setState({
        reviewCount: totalRatings,
        defaultPrice: parseFloat(this.props.product.default_price)
      });
    }

    if (this.props.selectedStyle !== prevProps.selectedStyle) {
      const selectedStyleData = this.props.styles.filter((style) => {
        return style.style_id === parseInt(this.props.selectedStyle);
      });
      const styleOriginalPrice = parseFloat(selectedStyleData[0].original_price);
      const styleSalePrice = parseFloat(selectedStyleData[0].sale_price) || null;
      this.setState({
        defaultPrice: styleOriginalPrice,
        salePrice: styleSalePrice
      });
    }

  }

  render () {
    return (
      <div>
        <StarAverage />{' '}<a href="/"><small>{`Read all ${this.state.reviewCount} reviews here`}</small></a>
        <div>{this.props.product.category}</div>
        <div>{this.props.product.name}</div>
        {this.state.salePrice ? <div><span style={{textDecoration: 'line-through'}}>${this.state.defaultPrice}</span><span style={{color: 'red'}}> ${this.state.salePrice}</span></div> : <div>${this.state.defaultPrice}</div>}
        <div>
          <button><i className="fab fa-facebook"></i></button>{' '}
          <button><i className="fab fa-twitter"></i></button>{' '}
          <button><i className="fab fa-pinterest"></i></button>
        </div>
      </div>
    );
  }
}

export default ProductInformation;