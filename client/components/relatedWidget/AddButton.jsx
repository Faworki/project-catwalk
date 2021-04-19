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
          <h4>Like this product?</h4>
          <a href>
            <h4 style={{textDecoration: "underline"}}>Add it to your outift!</h4>
          </a>
          <button className="outfit-button" onClick={this.props.addToOutfit}>
            +
          </button>
          <h4>See your outfit here!</h4>
          <StarAverage reviewAverage={5} />
          <ActionButton
            buttonCallback={this.props.buttonCallback}
          />
        </div>
    );
  }
}

export default AddButton;