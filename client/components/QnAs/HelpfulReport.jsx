import React from 'react';
import axios from 'axios';
import Modal from 'react-modal';
import ModalComp from './ModalComp';

class HelpfulReport extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      reported: false,
      helpfulClicked: false,
      reportText: 'Report',
      helpVotes: 0,
      showModal: false,
    };
    this.report = this.report.bind(this);
    this.clickHelpful = this.clickHelpful.bind(this);
    this.addAnswer = this.addAnswer.bind(this);
    this.handleCloseModal = this.handleCloseModal.bind(this);
  }

  report() {
    if (!this.state.reported) {
      this.setState({
        reportText: 'Reported',
        reported: true,
      });
      axios
        .put(
          `/api/fec2/hrnyc/qa/questions/${this.props.id}/report`
        )
        .then(function (response) {})
        .catch(function (error) {
          console.log(error);
        });
    }
  }

  clickHelpful() {
    if (!this.state.helpfulClicked) {
      this.setState({
        helpVotes: this.props.helpVotes + 1,
        helpfulClicked: true,
      });
      axios
        .put(
          `/api/fec2/hrnyc/qa/questions/${this.props.id}/helpful`
        )
        .then(function (response) {})
        .catch(function (error) {
          console.log(error);
        });
    }
  }
  addAnswer() {
    this.setState({ showModal: true });
  }

  handleCloseModal() {
    this.setState({ showModal: false });
  }
  componentDidMount() {
    this.setState({
      helpVotes: this.props.helpVotes
    });
  }

  render() {
    //declaring a variable that will control the "report" text that should appear ONLY in answer HR instances
    var answerText, yesText;
    if (this.props.answerUsage) {
      if (!this.state.reported) {
        answerText = <button className='reportAnswer' onClick={this.report}>{this.state.reportText}</button>;
      } else {
        answerText = <p className='reported'>{this.state.reportText}</p>;
      }
    }

    if (!this.state.helpfulClicked) {
      yesText = <button className='reportAnswer' onClick={this.clickHelpful}> Yes ({this.state.helpVotes}) </button>;
    } else {
      yesText = <p className='reported'> Yes ({this.state.helpVotes})</p>;
    }

    var hrType = (this.props.answerUsage ? 'answerHR' : 'questionHR');

    return (
      <div className={hrType}>
        <div>
          Helpful?  | {yesText}  | {answerText}
          {/* this logic asks if this IS NOT an answer instance, i.e. is this for a question */}
          {!this.props.answerUsage && (
            <div className='addAnswer'>
              <button className='addAnswer' onClick={this.addAnswer}>Add Answer</button>
              <div>
                {/* this modal is for submitting a new answer */}
                <ModalComp
                  isOpen={this.state.showModal}
                  handleCloseModal={this.handleCloseModal}
                  id={this.props.id}
                  question={false}
                  prodName={this.props.prodName}
                  question_body={this.props.question_body}
                  question_id={this.props.question_id}
                />
              </div>
            </div>
          )}
        </div>
      </div>
    );
  }
}

export default HelpfulReport;
