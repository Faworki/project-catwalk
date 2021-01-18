import React from 'react';
import StarAverage from '../shared/StarAverage.jsx';
// import axios from 'axios';

class ProductInformation extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      product: null,
      reviewMetaData: null,
      reviewAverage: null,
      reviewCount: 0
    };
  }

  componentDidMount() {}

  componentDidUpdate(prevProps) {
    if (this.props.product !== prevProps.product) {
      let ratings = this.props.reviewMetaData.ratings;
      let totalRatings = 0;
      for (let rating in ratings) {
        totalRatings += parseInt(ratings[rating]);
      }
      this.setState({
        product: this.props.product,
        reviewMetaData: this.props.reviewMetaData,
        reviewAverage: this.props.reviewAverage,
        reviewCount: totalRatings
      });
    }
  }

  render () {
    return (
      <div>
        <StarAverage />{' '}<a href="/"><small>{`Read all ${this.state.reviewCount} reviews here`}</small></a>
        <div>{this.props.product.category}</div>
        <div>{this.props.product.name}</div>
        <div>${this.props.product.default_price}</div><br />
      </div>
    );
  }
}

export default ProductInformation;