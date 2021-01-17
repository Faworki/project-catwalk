import React from 'react';

class HelpfulReport extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      reported: false,
      helpfulClicked: false,
      reportText: 'Report',
      helpVotes: this.props.helpVotes
    };
    this.report = this.report.bind(this);
    this.clickHelpful = this.clickHelpful.bind(this);
  }

  componentDidMount() {

   }
  report() {
    console.log('we have reported this answer');
    this.setState({
      reportText: 'Reported',
      reported: true
    });
  }
  clickHelpful() {
    if (!this.state.helpfulClicked) {
      console.log('thanks for letting us know this answer was helpful');
      this.setState({
        helpVotes: this.state.helpVotes + 1,
        helpfulClicked: true
      });
    }
  }


  render() {

    // var messagesShownController =
    return (
      <div>
        <div>Helpful?
              <a onClick={this.clickHelpful}>   |   Yes ({ this.state.helpVotes })   |   </a>

              <a onClick={this.report}>{this.state.reportText}</a>
            </div>
      </div>
    );
  }
}

export default HelpfulReport;