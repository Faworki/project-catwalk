import React from 'react';

class Question extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      answers: []
    };
  }

  componentDidMount() {
    // console.log('answers as they come in', this.props.data.answers);
    if (!(Object.keys(this.props.answers).length === 0 && this.props.answers.constructor === Object)) {
      console.log('answer found');
      this.setState({
        answers: Object.values(this.props.answers)
      });
    } else {
      this.setState({
        answers: [{body: 'no answer for this questions'}, {body: 'no answer for this questions'}]
      });
    }

  }

  render() {
    // if (this.state.answers[0]['body']) {
      console.log('this.state.answers', this.state.answers);
    // }
    return (
      <div>
        <h4>Q</h4>
        <div>
          {this.props.question}
        </div>
        <h4>A</h4>
        <div>
          {this.state.answers[0][body]}
        </div>
        {/* <h4>A</h4>
        <div>
          {this.state.answers[1]['body']}
        </div> */}
      </div>
    );
  }
}

export default Question;