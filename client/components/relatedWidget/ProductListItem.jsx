import React from 'react';

class ProductListItem extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidUpdate(prevProps) {
    if (this.props.image !== prevProps.image) {
      console.log('list item render')
      this.render();
    }
  }

  render () {
    console.log('image:', this.props.image);
    return (<div
      className={`menu-item ${this.props.selected ? 'active' : ''}`}
      >
        {this.props.text.name}
        <img src={this.props.image} width='300' height='300'/>
      </div>)
  }
}

// const ProductListItem = ({text, image, selected}) => {
//   console.log('image:', image);
//   return (<div
//     className={`menu-item ${selected ? 'active' : ''}`}
//     >
//       {text.name}
//       <img src={image}/>
//     </div>)
// };

export default ProductListItem;