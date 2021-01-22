import React from 'react';

class ActionButton extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
        <img
        src='https://static.thenounproject.com/png/2854151-200.png'
         onClick={()=>{
          this.props.buttonCallback(this.props.productId);
          }}
          width='25px'
          height='25px'
          />
      </div>
    );
  }
}

export default ActionButton;
