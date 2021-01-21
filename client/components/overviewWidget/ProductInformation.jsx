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
      <div className="product-information">
        <StarAverage reviewAverage={this.props.reviewAverage}/>{' '}<a href="#anchor"><small>{`Read all ${this.state.reviewCount} reviews`}</small></a>
        <div className="item-category">{this.props.product.category}</div>
        <div className="product-name">{this.props.product.name}</div>
        {this.state.salePrice ? <div><span style={{textDecoration: 'line-through'}}>${this.state.defaultPrice}</span><span style={{color: 'red'}}> ${this.state.salePrice}</span></div> : <div>${this.state.defaultPrice}</div>}
        <div>
          <button className="social-media-btn"><i className="fab fa-facebook"></i></button>{' '}
          <button className="social-media-btn"><i className="fab fa-twitter"></i></button>{' '}
          <button className="social-media-btn"><i className="fab fa-pinterest"></i></button>
        </div>
      </div>
    );
  }
}

export default ProductInformation;