import React from 'react';
import Styles from './Styles.jsx';
// import axios from 'axios';

class StyleSelector extends React.Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  componentDidMount() {}

  render () {
    return (
      <div>
        <span><small>STYLE &gt; </small></span><span>{'selected style'}</span>
        <Styles />
      </div>
    );
  }
}

export default StyleSelector;