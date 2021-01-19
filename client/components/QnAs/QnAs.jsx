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
      visibleQsQuant: 2,
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