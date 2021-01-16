import React from 'react';

class Question extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  render() {
    return (
      <div>
        <h4>Quesions Item</h4>
        {this.props.data.question_body}
      </div>
    );
  }
}

export default Question;