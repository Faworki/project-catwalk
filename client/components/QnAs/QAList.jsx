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
      .get('/api/fec2/hrnyc/qa/questions?product_id=11001')
      .then((productInfo) => {
        this.setState({
          questionData: productInfo.data.results,
        });
      })
      .then(()=>{
        this.props.getQuestionQuantity(this.state.questionData.length);
      })
      .catch((err) => console.error(err));
  }

  render() {
    //facilitates search - this line goes through the question
    var QAItemArr = this.state.questionData.map((question) => {
      //answersArr is an array containing all answer text for this question
      var answersArr = Object.values(question.answers);
      //if there are answers for this question
      if (answersArr.length > 0) {
        //map over all answers, put them in QAT
        var questionAnswerText = answersArr.map((answer) => {
          return answer.body;
        });
      }

      //put all question text and answer text in one string
      var allText = question.question_body + questionAnswerText;
      if (allText.indexOf(this.props.searchTerm) > -1) {
        return (
          <div key={question.question_id}>
            <Question
              className='questionComp'
              id={this.props.id}
              question={question}
              prodName={this.props.prodName}
              answers={Object.values(question.answers)}
            />
          </div>
        );
      }
    }).slice(0, this.props.visibleQsQuant);

    return (
      <div className='QAItemArr'>
        <div>{QAItemArr}</div>
      </div>
    );
  }
}

export default QAList;
