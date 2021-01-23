import React from 'react';

class Styles extends React.Component {
  constructor(props) {
    super(props);
  }

  render () {
    return (
      <span>
        <img
          className="styles"
          id={this.props.styleId}
          src={this.props.thumbnail}
          alt="Thumbnail"
          width="70"
          height="70"
          onClick={this.props.clickedStyleHandler}
        />{' '}
      </span>
    );
  }
}

export default Styles;