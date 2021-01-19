import React from 'react';
// import axios from 'axios';

class ProductFeatures extends React.Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  componentDidMount() {}

  render () {
    return (
      <div>
        <span>&#10003;</span>{' '}<span>{`${this.props.feature.feature}: ${this.props.feature.value}`}</span>
      </div>
    );
  }
}

export default ProductFeatures;