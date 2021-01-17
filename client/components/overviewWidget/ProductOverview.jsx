import React from 'react';
// import axios from 'axios';

class ProductOverview extends React.Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  componentDidMount() {}

  render () {
    return (
      <div>
        <div>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Donec ac odio tempor orci dapibus ultrices in. Duis ultricies lacus sed turpis tincidunt id aliquet risus. Faucibus et molestie ac feugiat sed lectus vestibulum. Tellus integer feugiat scelerisque varius morbi enim nunc faucibus a. Tristique senectus et netus et malesuada fames ac. Donec enim diam vulputate ut pharetra. Ornare massa eget egestas purus viverra accumsan in. Cum sociis natoque penatibus et. Sagittis nisl rhoncus mattis rhoncus urna neque viverra. Accumsan lacus vel facilisis volutpat est velit egestas. Tellus molestie nunc non blandit massa enim. Condimentum id venenatis a condimentum vitae sapien pellentesque habitant morbi. Enim ut sem viverra aliquet eget. Ut pharetra sit amet aliquam id diam. Suscipit adipiscing bibendum est ultricies integer quis auctor elit sed.</div><br />
        <span>&#10003;</span>{' '}<span>Lorem ipsum dolor sit amet</span><br />
        <span>&#10003;</span>{' '}<span>Consectetur adipiscing elit</span><br />
        <span>&#10003;</span>{' '}<span>sed do eiusmod tempor incididunt</span><br />
        <span>&#10003;</span>{' '}<span>Ut labore et dolore magna aliqua</span>
      </div>
    );
  }
}

export default ProductOverview;