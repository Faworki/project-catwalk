import React from 'react';
import StarAverage from '../shared/StarAverage.jsx';
import ActionButton from './ActionButton.jsx';

class AddButton extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
        <div className="menu-item add-button">
          <h4>Add To Outfit</h4>
          <a href>
            <h4 style={{textDecoration: "underline"}}>Product Name</h4>
          </a>
          <button className="outfit-button" onClick={this.props.addToOutfit}>
            +
          </button>
          <h4>Price</h4>
          <StarAverage reviewAverage={this.props.stars} />
          <ActionButton
            buttonCallback={this.props.buttonCallback}
          />
        </div>
    );
  }
}

export default AddButton;