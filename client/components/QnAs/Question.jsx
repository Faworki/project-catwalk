import React from 'react';

class Question extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      question: this.props.question,
      answers: this.props.answers
    };
  }

  componentDidMount() {
    // console.log('answers as they come in', this.props.data.answers);
    // if (!(Object.keys(this.props.answers).length === 0 && this.props.answers.constructor === Object)) {
    //   console.log('answer found');
    //   this.setState({
    //     answers: Object.values(this.props.answers)
    //   });
    // } else {

    // }

  }

  render() {
    // if (this.state.answers[0]['body']) {
      console.log('this.props.answers', this.props.answers);
    // }
    var answersArr = this.props.answers.map((answer)=>{
      if (answer.length === 0) {
        return <div></div>;
      } else {
        return (
          <li>
            {answer.body}
          </li>
        );
      }
    });

    return (
      <div>
        <h4>Q</h4>
        <li>
          {this.props.question.question_body}
        </li>
        <h4>A</h4>
        {answersArr}
        {/* <div>
          {this.state.answers[0]['body']}
        </div>
        <h4>A</h4>
        <div>
          {this.state.answers[1]['body']}
        </div> */}
        <div>
          LOAD MORE ANSWERS
        </div>
      </div>
    );
  }
}

export default Question;