import React from 'react';
import HelpfulReport from './HelpfulReport';

class Question extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      visible: [],
      allAnswers: [],
      loadMoreLess: 'LOAD MORE ANSWERS',
      less: true
    };
    this.toggleMoreFewer = this.toggleMoreFewer.bind(this);
  }

  componentDidMount() {
    if (this.props.answers.length > 0) {
      var sortedAnswers = this.props.answers.sort(function (a, b) {
        return b.helpfulness - a.helpfulness;
      });
      this.setState({
        visible: this.props.answers.slice(0, 2),
        allAnswers: this.props.answers
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
        visible: this.props.answers,
        loadMoreLess: 'SHOW FEWER',
        less: false,
      });
    } else {
      this.setState({
        visible: this.props.answers.slice(0, 2),
        loadMoreLess: 'LOAD MORE ANSWERS',
        less: true,
      });
    }
  }

  render() {
    var answersArr = this.state.visible.map((answer) => {
      if (answer.length === 0) {
        return null;
      } else {
        var author = answer.answerer_name;
        if (answer.answerer_name === 'Seller') {
          var author = <b>Seller</b>;
        }
        return (
          <div className='answerPkg' key={answer.id}>
            <h4>
              A: {answer.body}
            </h4>
            <div>
              by {author}, {answer.date.substring(0, 10)}
            </div>
            {/* //controls the answer instances of helpfulReport*/}
            <HelpfulReport
              id={this.props.id}
              helpVotes={answer.helpfulness}
              answerUsage={true}
              question_body={this.props.question_body}
              prodName={this.props.prodName}
            />
          </div>
        );
      }
    });

    return (
      <div className='QuestionSet'>
        <h4>
          Q: {this.props.question.question_body}
        </h4>
        {answersArr}
        {/* <br></br> */}
        <div className='loadMoreLess'>
          {this.props.answers.length > 2 ? (
            <a onClick={this.toggleMoreFewer}>{this.state.loadMoreLess}</a>
          ) : null}
        </div>
        {/* //controls the question instances of helpfulReport*/}
        <HelpfulReport
          id={this.props.id}
          helpVotes={this.props.question.question_helpfulness}
          answerUsage={false}
          question_body={this.props.question.question_body}
          question_id={this.props.question.question_id}
          prodName={this.props.prodName}
        />
      </div>
    );
  }
}

export default Question;
