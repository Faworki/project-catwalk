import React from 'react';

class AddButton extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="menu-item-wrapper">
        <div className="menu-item">
          <button onClick={this.props.addToOutfit}>
            +
          </button>
        </div>
      </div>
    );
  }
}

export default AddButton;