import React from 'react';
// import axios from 'axios';

class Overview extends React.Component {
  constructor() {
    super();

    this.state = {};
  }

  componentDidMount() {
    console.log('OVERVIEW COMPONENT MOUNTED!');
  }

  render () {
    return (
      <div>
        <div>OVERVIEW COMPONENT HERE</div>
      </div>
    );
  }
}

export default Overview;