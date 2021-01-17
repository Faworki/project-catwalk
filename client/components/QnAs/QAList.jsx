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
    //why can't i use a template literal here?
    axios.get('http://localhost:3000/api/fec2/hrnyc/qa/questions?product_id=11001')
      .then((productInfo) => {
        // console.log('product info', productInfo.data.results);
        this.setState({
          questionData: productInfo.data.results
        });
      })
      .catch((err) => console.error(err));
  }


  render() {
    var QAItemArr = this.state.questionData.map((question)=>{
      return (
        <div key={question.question_id}>
          <Question
            id={this.props.id}
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