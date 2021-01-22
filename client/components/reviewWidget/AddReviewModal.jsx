import React, { Component } from 'react';
import Modal from 'react-modal';
import { RadioGroup, RadioButton } from 'react-radio-buttons';

export class AddReviewModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showModal: false,
      rating: '',
      summary: '',
      body: '',
      nickname: '',
      email: '',
    };

    this.handleInputChange = this.handleInputChange.bind(this);
  }

  handleInputChange(event) {
    const target = event.target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const name = target.name;

    this.setState({
      [name]: value,
    });
  }

  handleSubmit(event) {
    event.preventDefault();
    console.log('Submited');
  }

  validateForm() {
    console.log('Validating form');
  }

  apiSubmitReview(review){
    console.log('Sending Review')
  }

  render() {
    let charCountCol = this.state.body.length < 51 ? 'red' : 'inherit';
    return (
      <Modal isOpen={this.props.showModal}>
        <button className="close-modal-btn" onClick={this.props.closeModal}>
          X
        </button>
        <form>
          <h2>Tell Us What You Think</h2>

          <div id="rating-input">
            <label htmlFor="rating">Rating:</label>
          </div>

          <div id="review-summary">
            <label htmlFor="summary">Summary:</label>
            <input
              type="text"
              name="summary"
              maxLength="60"
              placeholder="Example: Best purchase ever!"
              value={this.state.summary}
              onChange={this.handleInputChange}
            ></input>
          </div>

          <div id="review-body">
            <label htmlFor="body">Review:</label>
            <textarea
              name="body"
              maxLength="1000"
              minLength="50"
              placeholder="Why did you like the product or not?"
              value={this.state.body}
              onChange={this.handleInputChange}
            ></textarea>
            <span style={{color: charCountCol}}>{this.state.body.length}</span>
          </div>

          {/* <div id="review-submit-img">
            <label htmlFor="images">Add Product Images</label>
            <input type="file" name="images" accept=".jpg, .jpeg, .png" multiple></input>
            <div className="image-preview">
            </div>
          </div> */}

          <div id="review-nickname">
            <label htmlFor="nickname">Nickname:</label>
            <input
              type="text"
              name="nickname"
              maxLength="60"
              placeholder="Example: jackson11!"
              value={this.state.nickname}
              onChange={this.handleInputChange}
            ></input>
          </div>

          <div id="review-email">
            <label htmlFor="email">Email:</label>
            <input
              type="email"
              name="email"
              maxLength="60"
              placeholder="Example: jackson11@email.com"
              value={this.state.email}
              onChange={this.handleInputChange}
            ></input>
          </div>

          <div id="submit-review">
            <button onClick={this.handleSubmit}>Submit Review</button>
          </div>
        </form>
      </Modal>
    );
  }
}

export default AddReviewModal;
