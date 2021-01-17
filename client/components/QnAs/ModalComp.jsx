import React from 'react';
import axios from 'axios';
import Modal from 'react-modal';
import SearchQs from './SearchQs';
import QAList from './QAList';


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
    var text = e.target.value;
    this.setState({
      newQtext: text
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
    return (
      <div>
          <Modal
           isOpen={this.props.isOpen}
           contentLabel="Minimal Modal Example"
          >
            <button onClick={this.props.handleCloseModal}>Close Modal</button>
            <input type="text" onChange={this.handleQuestionInput} placeholder='Your Question' />
            <input type="text" onChange={this.handleNickmameInput} placeholder='Nickname'/>
            <input type="text" onChange={this.handleEmailInput} placeholder='email'/>
            <button onClick={this.submit}>Submit</button>

          </Modal>
      </div>
    );
  }
}

export default ModalComp;