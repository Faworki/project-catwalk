import React from 'react';
import axios from 'axios';
import SearchQs from './SearchQs';

class QnAs extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      searchTerm: '',
      visibleQsQuant: 2,

    };
  }

  componentDidMount() {

  }

  render() {
    return (
      <div>
        <h1>Quesions and Answers</h1>
        <SearchQs />
      </div>
    );
  }
}

export default QnAs;