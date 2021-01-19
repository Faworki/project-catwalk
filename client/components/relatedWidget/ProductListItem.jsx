import React from 'react';

class ProductListItem extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      display: false
    };
  }

  componentDidUpdate(prevProps) {
    if (this.props.image !== prevProps.image) {
      this.setState({display: true});
    }
  }

  render () {
    console.log('image:', this.props.image);
    return (<div
      className={`menu-item ${this.props.selected ? 'active' : ''}`}
      >
        {this.props.text.name}
        <img src={this.props.image} width='300' height='300'/>
      </div>);
  }
}

export default ProductListItem;