import React from 'react';
import axios from 'axios';
import Modal from 'react-modal';
import SearchQs from './SearchQs';
import QAList from './QAList';
import ModalComp from './ModalComp';

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
      newQnickname: '',
      newQtext: '',
      newQemail: '',
      newQphotos: [],
      showModal: false

    };
    this.updateSearchTerm = this.updateSearchTerm.bind(this);
    this.handleOpenModal = this.handleOpenModal.bind(this);
    this.handleCloseModal = this.handleCloseModal.bind(this);
    // this.handleNickmameInput = this.handleNickmameInput.bind(this);
    // this.handleQuestionInput = this.handleQuestionInput.bind(this);
    // this.handleEmailInput = this.handleEmailInput.bind(this);
    // this.submit = this.submit.bind(this);

  }

  handleOpenModal () {
    this.setState({ showModal: true });
  }

  handleCloseModal () {
    this.setState({ showModal: false });
  }

  // handleQuestionInput(e) {
  //   // console.log('value', e.target.value);
  //   var text = e.target.value;
  //   this.setState({
  //     newQtext: text
  //   });
  //   e.preventDefault();
  // }

  // handleNickmameInput(e) {
  //   // console.log('value', e.target.value);
  //   e.preventDefault();
  //   this.setState({
  //     newQnickname: e.target.value
  //   });
  // }

  // handleEmailInput(e) {
  //   console.log('value', e.target.value);

  //   this.setState({
  //     newQemail: e.target.value
  //   });
  //   // e.preventDefault();
  // }

  // submit(e) {
  //   // console.log('submit!', this.state);
  //   // e.preventDefault();

  //   axios.post('http://localhost:3000/api/fec2/hrnyc/qa/questions', {
  //     params: {
  //       'body': this.state.newQtext,
  //       'name': this.state.newQnickname,
  //       'email': this.state.newQemail,
  //       'product_id': this.props.product.id
  //     }
  //   })
  //     .then((productInfo) => {
  //       console.log('product info', productInfo.data.results);
  //       this.setState({
  //         questionData: productInfo.data.results
  //       });
  //     })
  //     .then(()=>{
  //       this.setState({
  //         showModal: false,
  //         newQnickname: '',
  //         newQtext: '',
  //         newQemail: ''
  //       });
  //     })
  //     .catch((err) => {
  //       console.error(err);
  //       this.setState({
  //         showModal: false,
  //         newQnickname: '',
  //         newQtext: '',
  //         newQemail: ''
  //       });
  //     });
  //     e.preventDefault();

  // }


  updateSearchTerm(e) {

    if (e.target.value.length > 2) {
      this.setState({
        searchTerm: e.target.value
      });
    } else {
      this.setState({
        searchTerm: ''
      });
    }
  }

  render() {
    return (
      <div>
        <h1>Quesions and Answers</h1>
        <SearchQs updateSearchTerm={this.updateSearchTerm}/>
        <QAList
          id={this.props.product.id}
          searchTerm={this.state.searchTerm}
          />
          <ModalComp
            isOpen={this.state.showModal}
            handleCloseModal={this.handleCloseModal}
            id={this.props.product.id}
          />
          {/* <Modal
           isOpen={this.state.showModal}
           contentLabel="Minimal Modal Example"
          >
            <button onClick={this.handleCloseModal}>Close Modal</button>
            <input type="text" onChange={this.handleQuestionInput} placeholder='Your Question' />
            <input type="text" onChange={this.handleNickmameInput} placeholder='Nickname'/>
            <input type="text" onChange={this.handleEmailInput} placeholder='email'/>
            <button onClick={this.submit}>Submit</button>

          </Modal> */}
        <button>
          MORE ANSWERED QUESTIONS
        </button>
        <button onClick={this.handleOpenModal}>
          ADD A QUESTION +
        </button>
      </div>
    );
  }
}

export default QnAs;