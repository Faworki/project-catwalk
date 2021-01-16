import React from 'react';
import axios from 'axios';
import SearchQs from './SearchQs';
import QAList from './QAList';

class QnAs extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      searchTerm: '',
      questionsIDs: [],
      questions: [],
      answersIDs: [],
      answers: [],
      visibleQsQuant: 2,

    };
    this.updateSearchTerm = this.updateSearchTerm.bind(this);
  }

  componentDidMount() {
    //get request to get all Questions related to this prodID
    //setState with all Questions IDs
    //one at a time, get request for each QuestionID
    //store
  }

  updateSearchTerm(e) {

    if (e.target.value.length > 2) {
      console.log('search term', e.target.value);
      this.setState({
        searchTerm: e.target.value
      });
    }
  }

  render() {
    return (
      <div>
        <h1>Quesions and Answers</h1>
        <SearchQs updateSearchTerm={this.updateSearchTerm}/>
        <QAList id={this.props.product.id} />
      </div>
    );
  }
}

export default QnAs;