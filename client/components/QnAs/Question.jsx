import React from 'react';
import HelpfulReport from './HelpfulReport';

class Question extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      question: this.props.question,
      answers: this.props.answers,
      visible: [],
      loadMoreLess: 'LOAD MORE ANSWERS',
      less: true,
    };
    this.toggleMoreFewer = this.toggleMoreFewer.bind(this);
  }

  componentDidMount() {
    if (this.props.answers.length > 0) {
      var sortedAnswers = this.props.answers.sort(function(a, b) {
        return  b.helpfulness - a.helpfulness;
      });
      this.setState({
        visible: this.props.answers.slice(0, 2),
      });
    }
  }
  report() {
    this.setState({
      reportText: 'Reported',
    });
  }

  toggleMoreFewer() {
    if (this.state.less) {
      this.setState({
        visible: this.state.answers,
        loadMoreLess: 'SHOW FEWER',
        less: false,
      });
    } else {
      this.setState({
        visible: this.state.answers.slice(0, 2),
        loadMoreLess: 'LOAD MORE ANSWERS',
        less: true,
      });
    }
  }

  render() {
    var answersArr = this.state.visible.map((answer) => {
      if (answer.length === 0) {
        return <div></div>;
      } else {
        return (
          <div key={answer.id}>
            <h4>
              A
              <div>{answer.body}</div>
            </h4>
            <div>
              by {answer.answerer_name}, {answer.date.substring(0, 10)}
            </div>
            <HelpfulReport
              id={this.props.id}
              helpVotes={answer.helpfulness}
            />
          </div>
        );
      }
    });
    // var messagesShownController =
    return (
      <div>
        <h4>
          Q
          <div>{this.props.question.question_body}</div></h4>
        {answersArr}
        <br></br>
        <div>
          {this.state.answers.length > 2 ? (
            <a onClick={this.toggleMoreFewer}>{this.state.loadMoreLess}</a>
          ) : null}
        </div>
      </div>
    );
  }
}

export default Question;
