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
    // console.log('product data', this.props.product);
    return (
      <div>
        <h1>Quesions and Answers</h1>
        <SearchQs updateSearchTerm={this.updateSearchTerm}/>
        <QAList
          id={this.props.product.id}
          searchTerm={this.state.searchTerm}
          prodName={this.props.product.name}
          />
          <ModalComp
            isOpen={this.state.showModal}
            handleCloseModal={this.handleCloseModal}
            id={this.props.product.id}
            question={true}
            prodName={this.props.product.name}
          />
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