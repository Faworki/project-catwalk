import React from 'react';
import axios from 'axios';
import Modal from 'react-modal';
import SearchQs from './SearchQs';
import QAList from './QAList';

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
      newQphotos: []

    };
    this.updateSearchTerm = this.updateSearchTerm.bind(this);
    this.handleOpenModal = this.handleOpenModal.bind(this);
    this.handleCloseModal = this.handleCloseModal.bind(this);
    this.handleNickmameInput = this.handleNickmameInput.bind(this);
    this.handleQuestionInput = this.handleQuestionInput.bind(this);
    this.handleEmailInput = this.handleEmailInput.bind(this);
    this.submit = this.submit.bind(this);

  }

  handleOpenModal () {
    this.setState({ showModal: true });
  }

  handleCloseModal () {
    this.setState({ showModal: false });
  }

  handleNickmameInput(e) {
    console.log('value', e.target.value);
    e.preventDefault();
    this.setState = ({
      newQnickname: e.target.value
    });
  }

  handleQuestionInput(e) {
    console.log('value', e.target.value);
    this.setState = ({
      newQtext: e.target.value
    });
    e.preventDefault();
  }

  handleEmailInput(e) {
    console.log('value', e.target.value);

    this.setState = ({
      newQemail: e.target.value
    });
    e.preventDefault();
  }
  submit(e) {
    console.log('submit!', this.state);
    e.preventDefault();

    var body = this.state.newQtext;
    axios.post(`http://localhost:3000/api/fec2/hrnyc/qa/questions?body=${this.state.newQtext}` )
      .then((productInfo) => {
        console.log('product info', productInfo.data.results);
        this.setState({
          questionData: productInfo.data.results
        });
      })
      .catch((err) => console.error(err));

  }
  componentDidMount() {

  }

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
          <Modal
           isOpen={this.state.showModal}
           contentLabel="Minimal Modal Example"
          >
            <button onClick={this.handleCloseModal}>Close Modal</button>
            <input type="text" onChange={this.handleQuestionInput} placeholder='Your Question' />
            <input type="text" onChange={this.handleNickmameInput} placeholder='Nickname'/>
            <input type="text" onChange={this.handleEmailInput} placeholder='email'/>
            <button onClick={this.submit}>Submit</button>

          </Modal>
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