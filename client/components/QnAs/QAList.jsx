import React from 'react';
import axios from 'axios';
import Question from './Question';

class QAList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      searchTerm: '',
      questionData: [],
    };
  }

  componentDidMount() {
    //why can't i use a template literal here?
    axios
      .get('http://localhost:3000/api/fec2/hrnyc/qa/questions?product_id=11001')
      .then((productInfo) => {
        this.setState({
          questionData: productInfo.data.results,
        });
      })
      .catch((err) => console.error(err));
  }

  render() {
    var QAItemArr = this.state.questionData.map((question) => {
      var answersArr = Object.values(question.answers);
      if (answersArr.length > 0) {
        var questionAnswerText = answersArr.map((answer) => {
          return answer.body;
        });
      }
      var allText = question.question_body + questionAnswerText;
      if (allText.indexOf(this.props.searchTerm) > -1) {
        return (
          <div key={question.question_id}>
            <Question
              id={this.props.id}
              question={question}
              prodName={this.props.prodName}
              answers={Object.values(question.answers)}
            />
          </div>
        );
      }
    });

    return (
      <div>
        <div>{QAItemArr}</div>
      </div>
    );
  }
}

export default QAList;
