import React, { Component } from 'react';
import Modal from 'react-modal';
import RateCharacteristic from './RateCharacteristic';
import { CHAR_RATINGS } from '../utils/characteristics.js';
import ReviewStars from './ReviewStars';

const modalStyles = {
  content: {
    'min-width': '600px',
    left: '50%',
    right: 'auto',
    transform: 'translate(-50%)',
    'border-radius': '0',
    'padding-top': '0',
  },
};

export class AddReviewModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showModal: false,
      rating: 0,
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
    console.log('Submitted');
  }

  validateForm() {
    console.log('Validating form');
  }

  apiSubmitReview(review) {
    console.log('Sending Review');
  }

  render() {
    let charCountCol = this.state.body.length < 51 ? 'red' : 'inherit';
    return (
      <Modal
        style={modalStyles}
        isOpen={this.props.showModal}
        id="add-review-modal"
      >
        <div className="modal-controls">
          <button className="close-modal-btn" onClick={this.props.closeModal}>
            X
          </button>
          <h2>Tell Us What You Think</h2>
        </div>
        <form id="add-review-form">
          <div id="rating-input">
            <ReviewStars
              currentValue={this.state.rating}
              handleInputChange={this.handleInputChange}
            />
          </div>

          <div id="characteristics-input">
            {this.props.characteristics.map((characteristic) => {
              return (
                <RateCharacteristic
                  characteristic={characteristic}
                  ratings={CHAR_RATINGS[characteristic]}
                  handleInputChange={this.handleInputChange}
                  currentValue={this.state[characteristic] || ''}
                  key={characteristic}
                />
              );
            })}
          </div>

          <div id="review-summary">
            <label htmlFor="summary">
              <h4>Review Title</h4>
            </label>
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
            <label htmlFor="body">
              <h4>Review Body</h4>
            </label>
            <textarea
              name="body"
              maxLength="1000"
              minLength="50"
              placeholder="Why did you like the product or not?"
              value={this.state.body}
              onChange={this.handleInputChange}
            ></textarea>
            <div>
              <span>*Review body must be at least 50 characters</span>
              <span style={{ color: charCountCol }}>
                {this.state.body.length <= 50 ? this.state.body.length : null}
              </span>
            </div>
          </div>

          <div id="review-submit-img">
            <label htmlFor="images">
              <h4>Add Product Images</h4>
            </label>
            <input
              type="file"
              name="images"
              accept=".jpg, .jpeg, .png"
              multiple
            ></input>
            <div className="image-preview"></div>
          </div>

          <div id="review-nickname">
            <label htmlFor="nickname">
              <h4>Nickname</h4>
            </label>
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
            <label htmlFor="email">
              <h4>Email</h4>
            </label>
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
