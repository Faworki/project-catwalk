import React from 'react';
import axios from 'axios';
import Question from './Question';


class QAList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      searchTerm: '',
      questionData: [],
      visibleQsQuant: 2,
      visibleAsQuant: 2
    };


  }

  componentDidMount() {
    // Set state for product/qa/questions
    //why can't i use a template literal here?
    axios.get('http://localhost:3000/api/fec2/hrnyc/qa/questions?product_id=11001')
      .then((productInfo) => {
        console.log('product info', productInfo.data.results);
        this.setState({
          questionData: productInfo.data.results
        });
      })
      .catch((err) => console.error(err));
  }


  render() {
    // console.log('question data', this.state.questionData);
    var QAItemArr = this.state.questionData.map((question)=>{
      console.log('question inside my map', question.answers);
      // Object.keys(question.answers).length === 0 && question.answers.constructor === Object
      // if (Object.keys(question.answers).length === 0 && question.answers.constructor === Object) {
      //   question.answers = [{body: 'NO ANSWER'}, {body: 'NO ANSWER'}];
      // }
      // var answersArr = Object.values(question.answers);

      return (
        <div>
          <Question
            key={question.id}
            question={question}
            answers={Object.values(question.answers)}
          />
        </div>
      );
    });

    return (
      <div>
        <h1>QAList</h1>
        <div>
          {QAItemArr}
        </div>
      </div>
    );
  }
}

export default QAList;