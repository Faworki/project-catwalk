import React from 'react';
import axios from 'axios';
import Modal from 'react-modal';
import SearchQs from './SearchQs';
import QAList from './QAList';

Modal.setAppElement(document.getElementById('app'));

const customStyles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
  },
};

class ModalComp extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      formBody: '',
      formNickname: '',
      formEmail: '',
      newQphotos: [],
      showModal: false,
    };

    this.handleNickmameInput = this.handleNickmameInput.bind(this);
    this.handleQuestionInput = this.handleQuestionInput.bind(this);
    this.handleEmailInput = this.handleEmailInput.bind(this);
    this.testForm = this.testForm.bind(this);
    this.submit = this.submit.bind(this);
    this.validateEmail = this.validateEmail.bind(this);
  }

  handleQuestionInput(e) {
    this.setState({
      formBody: e.target.value,
    });
    e.preventDefault();
  }

  handleNickmameInput(e) {
    this.setState({
      formNickname: e.target.value,
    });
    e.preventDefault();
  }

  handleEmailInput(e) {
    this.setState({
      formEmail: e.target.value,
    });
    e.preventDefault();
  }

  submit() {
    //default to post a QUESTION
    var reqUrl = 'http://localhost:3000/api/fec2/hrnyc/qa/questions';
    var reqParams = {
      'body': this.state.formBody,
      'name': this.state.formNickname,
      'email': this.state.formEmail,
      'product_id': this.props.id,
    };
    //unless were posting an answer
    if (!this.props.question) {
      reqUrl = `http://localhost:3000/api/fec2/hrnyc/qa/questions/${this.props.question_id}/answers`;
      delete reqParams['product_id'];
    }
    axios.post(reqUrl, {
        params: reqParams,
      })
      .then(() => {
        this.setState({
          showModal: false,
          formNickname: '',
          formBody: '',
          formEmail: '',
        });
      })
      .catch((err) => {
        console.error(err);
        this.setState({
          showModal: false,
          formNickname: '',
          formBody: '',
          formEmail: '',
        });
      });
    this.props.handleCloseModal();
  }

  validateEmail(inputText) {
    var mailformat = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
    if (inputText.match(mailformat)) {
      return true;
    } else {
      return false;
    }
  }

  testForm(e) {
    //set a fields object with current state values
    var fieldsObj = {
      'Question': this.state.formBody,
      'Nickname': this.state.formNickname,
      'Email': this.state.formEmail,
    };
    if (!this.props.question) {
      console.log('ModalComp sees an new answer form');
      delete fieldsObj['Question'];
      fieldsObj['Answer'] = this.state.formBody;
      // emptyFields.splice(0, 1, 'Answer');
    }
    console.log('heres my fieldsObj, it should be different based on context', fieldsObj);
    //empty array, to capture the names of empty fields
    var emptyFields = [];
    for (var key in fieldsObj) {
      if (fieldsObj[key].length === 0) {
        emptyFields.push(key);
      }
    }
    var emptyAlertText = emptyFields.join(', ');
    if (emptyFields.length > 0) {
      alert('You must enter the following: ' + emptyAlertText);
    } else if (!this.validateEmail(this.state.formEmail)) {
      alert('Please enter a valid email address');
    } else {
      this.submit();
    }
    e.preventDefault();
  }

  render() {
    return (
      <div>
        <Modal
          style={customStyles}
          isOpen={this.props.isOpen}
          contentLabel='Minimal Modal Example'
        >
          {this.props.question ? (
            <div>
              <div>
                <h1>Ask Your Question</h1>
                <h4>About the {this.props.prodName}</h4>
              </div>
              <br></br>
              <div>
                <div>* Your Question (1000 character limit)</div>
              </div>
            </div>
          ) : (
            <div>
              <div>
                <h1>Submit Your Answer</h1>
                <h4>
                  {this.props.prodName} : {this.props.question_body}
                </h4>
              </div>
              <br></br>
              <div>
                <div>* Your Answer (1000 character limit)</div>
              </div>
            </div>
          )}
          <div>
            <textarea
              name='message'
              style={{ width: '400px', height: '200px' }}
              type='text'
              onChange={this.handleQuestionInput}
              maxLength='1000'
            />
          </div>
          <br></br>
          <div>
            <div>* Your Nickname (60 character limit)</div>
            <input
              type='text'
              onChange={this.handleNickmameInput}
              placeholder='Example: jackson11!'
              maxLength='60'
            />
            <div>
              For privacy reasons, do not use your full name or email address
            </div>
          </div>
          <br></br>
          <div>
            <div>* Your email (60 character limit)</div>
            <input
              type='text'
              onChange={this.handleEmailInput}
              placeholder='Example: jack@email.com'
              maxLength='60'
            />
            <div>For authentication reasons, you will not be emailed</div>
          </div>
          <br></br>
          <div>
            <button onClick={this.props.handleCloseModal}>Close Modal</button>
            <button onClick={this.testForm}>Submit</button>
          </div>
        </Modal>
      </div>
    );
  }
}

export default ModalComp;

// //post a question
// post('http://localhost:3000/api/fec2/hrnyc/qa/questions', {
//         params: {
//           'body': this.state.formBody,
//           'name': this.state.formNickname,
//           'email': this.state.formEmail,
//           'product_id': this.props.id,
//         },

// //post an answer
// post('http://localhost:3000/api/fec2/hrnyc/qa/questions/${question_id}/answers', {
//         params: {
//           'body': this.state.formBody,
//           'name': this.state.formNickname,
//           'email': this.state.formEmail
//         },
