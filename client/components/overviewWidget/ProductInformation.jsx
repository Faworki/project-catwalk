import React from 'react';
// import axios from 'axios';

class ProductInformation extends React.Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  componentDidMount() {}

  render () {
    return (
      <div>
        <span>{'stars here'}</span>{' '}<a href="/"><small>{`Read all ${5} reviews here`}</small></a>
        <div>{'category here'}</div>
        <div>{'Expanded Product Name Here'}</div>
        <div>{'price here (dynamic with any sale price)'}</div><br />
      </div>
    );
  }
}

export default ProductInformation;