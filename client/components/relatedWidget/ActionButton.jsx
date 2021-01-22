import React from 'react';

class ActionButton extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
        <button onClick={()=>{
          this.props.buttonCallback(this.props.productId);
          }}>
          ActionButton
        </button>
      </div>
    );
  }
}

export default ActionButton;