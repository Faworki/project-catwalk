import React from 'react';
import axios from 'axios';

class HelpfulReport extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      reported: false,
      helpfulClicked: false,
      reportText: 'Report',
      helpVotes: this.props.helpVotes,
      // answerUsage: this.props.answerUsage
    };
    this.report = this.report.bind(this);
    this.clickHelpful = this.clickHelpful.bind(this);
  }

  report() {
    if (!this.state.reported) {
      this.setState({
        reportText: 'Reported',
        reported: true,
      });
      axios.put(`http://localhost:3000/api/fec2/hrnyc/qa/questions/${this.props.id}/report`)
      .then(function (response) {
        // console.log(response);
      })
      .catch(function (error) {
        console.log(error);
      });
    }
  }
  clickHelpful() {
    if (!this.state.helpfulClicked) {
      this.setState({
        helpVotes: this.state.helpVotes + 1,
        helpfulClicked: true,
      });
      axios.put(`http://localhost:3000/api/fec2/hrnyc/qa/questions/${this.props.id}/helpful`)
      .then(function (response) {
        // console.log(response);
      })
      .catch(function (error) {
        console.log(error);
      });

    }
  }

  render() {
    return (
      <div>
        <div>
          Helpful?
          <a onClick={this.clickHelpful}> | Yes ({this.state.helpVotes}) | </a>
          {this.props.answerUsage && <a onClick={this.report}>{this.state.reportText}</a>}
          {!this.props.answerUsage && <a onClick={this.report}>add a question</a>}
        </div>
      </div>
    );
  }
}

export default HelpfulReport;
