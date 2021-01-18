import React from 'react';
import axios from 'axios';
import Modal from 'react-modal';
import SearchQs from './SearchQs';
import QAList from './QAList';

Modal.setAppElement(document.getElementById('app'));

class ModalComp extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      newQnickname: '',
      newQtext: '',
      newQemail: '',
      newQphotos: [],
      showModal: false
    };

    this.handleNickmameInput = this.handleNickmameInput.bind(this);
    this.handleQuestionInput = this.handleQuestionInput.bind(this);
    this.handleEmailInput = this.handleEmailInput.bind(this);
    this.submit = this.submit.bind(this);
  }


  handleQuestionInput(e) {
    console.log('question input', e.target.value);
    this.setState({
      newQtext: e.target.value
    });
    e.preventDefault();
  }

  handleNickmameInput(e) {
    this.setState({
      newQnickname: e.target.value
    });
    e.preventDefault();
  }

  handleEmailInput(e) {
    this.setState({
      newQemail: e.target.value
    });
    e.preventDefault();

  }

  submit(e) {
    axios.post('http://localhost:3000/api/fec2/hrnyc/qa/questions', {
      params: {
        'body': this.state.newQtext,
        'name': this.state.newQnickname,
        'email': this.state.newQemail,
        'product_id': this.props.id
      }
    })
      .then(()=>{
        this.setState({
          showModal: false,
          newQnickname: '',
          newQtext: '',
          newQemail: ''
        });
        // this.handleCloseModal();

      })
      .catch((err) => {
        console.error(err);
        this.setState({
          showModal: false,
          newQnickname: '',
          newQtext: '',
          newQemail: ''
        });
        // this.handleCloseModal();
      });
      this.props.handleCloseModal();
      e.preventDefault();

  }

  render() {
    console.log('prod name', this.props.prodName);
    console.log('questionbody', this.props.question_body);
    return (
      <div>
          <Modal
           isOpen={this.props.isOpen}
           contentLabel="Minimal Modal Example"
          >
            {this.props.question ?
            <div>
              <div>
                <h1>
                  Ask Your Question
                </h1>
                <h4>
                  About the {this.props.prodName}
                </h4>
              </div>
            </div>
            :
            <div>
              <div>
                <h1>
                  Submit Your Answer
                </h1>
                <h4>
                  {this.props.prodName} : {this.props.question_body}
                </h4>
              </div>
              <br></br>
              <div>
                <div>
                  Your Questions (1000 character limit)
                </div>
              </div>
            </div>
            }
            <div>
              <textarea
                name='message'
                style={{width: '400px', height: '200px'}}
                type="text"
                onChange={this.handleQuestionInput}
              />
            </div>
            <br></br>
            <div>
              <div>
                Your Nickname (60 character limit)
              </div>
              <input type="text" onChange={this.handleNickmameInput} placeholder='Example: jackson11!'/>
              <div>
                For privacy reasons, do not use your full name or email address
              </div>
            </div>
            <br></br>
            <div>
              <div>
                Your email (60 character limit)
              </div>
              <input type="text" onChange={this.handleEmailInput} placeholder='Example: jack@email.com'/>
              <div>
                For authentication reasons, you will not be emailed
              </div>
            </div>
            <br></br>
            <div>
              <button onClick={this.props.handleCloseModal}>Close Modal</button>
              <button onClick={this.submit}>Submit</button>
            </div>
          </Modal>
      </div>
    );
  }
}

export default ModalComp;