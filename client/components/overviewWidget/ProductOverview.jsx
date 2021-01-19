import React from 'react';
import axios from 'axios';
import ProductFeatures from './ProductFeatures.jsx';

class ProductOverview extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      product: null,
      slogan: '',
      description: '',
      features: []
    };
  }

  componentDidMount() {}

  componentDidUpdate(prevProps) {
    if (this.props.product !== prevProps.product) {
      axios.get(`/api/fec2/hrnyc/products/${this.props.product.id}`)
        .then(({data}) => {
          this.setState({
            product: this.props.product,
            slogan: data.slogan,
            description: data.description,
            features: data.features
          });
        })
        .catch((err) => {
          console.error(err);
        });
    }
  }

  render () {
    return (
      <div>
        <div>{this.state.slogan}</div><br />
        <div>{this.state.description}</div><br />
        {this.state.features.map((feature, index) => {
          return <ProductFeatures key={index} feature={feature}/>;
        })}
      </div>
    );
  }
}

export default ProductOverview;