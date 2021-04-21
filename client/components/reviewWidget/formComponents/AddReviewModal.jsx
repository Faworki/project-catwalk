import React, { Component } from 'react';
import Modal from 'react-modal';
import RateCharacteristic from './RateCharacteristic';
import { CHAR_RATINGS } from '../utils/characteristics.js';
import ReviewStars from './ReviewStars';
import form, { sendReview } from '../utils/forms.js';
import axios from 'axios';

const modalStyles = {
  content: {
    minWidth: '550px',
    left: '50%',
    right: 'auto',
    transform: 'translate(-50%)',
    borderRadius: '0',
    paddingTop: '0',
  },
};

const INVALID_MES = (
  <p style={{ color: 'red', margin: '0' }}>
    *Please fill out all required fields.
  </p>
);

const INITIAL_STATE = {
  showModal: false,
  rating: null,
  summary: '',
  body: '',
  nickname: '',
  email: '',
  recommend: null,
  errors: {},
  isValid: true,
  submitText: null,
};

export class AddReviewModal extends Component {
  constructor(props) {
    super(props);
    this.state = INITIAL_STATE;

    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.validateForm = this.validateForm.bind(this);
    this.handleCloseModal = this.handleCloseModal.bind(this);
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
    if (this.validateForm()) {
      //package body
      let { rating, summary, body, nickname, email, recommend } = this.state;
      let characteristics = {};
      let reviewBody = {
        rating,
        summary,
        body,
        name: nickname,
        email,
        recommend,
        photos: [],
        characteristics,
      };
      axios
        .post('/reviews', reviewBody)
        .then(() => {
          console.log('Good response');
          this.setState({
            submitText: 'Thank you for submitting a review!',
          });
        })
        .catch((err) => {
          console.error(err);
          this.setState({
            submitText: 'Oops something went wrong, please try again later.',
          });
        });
    }
  }

  validateForm() {
    const errors = {};
    let isValid = true;
    if (!form.validateNotEmpty(this.state.rating)) {
      errors.rating = true;
      isValid = false;
    }
    if (!form.validateMinLength(this.state.body, 50)) {
      errors.body = true;
      isValid = false;
    }
    if (!form.validateNotEmpty(this.state.nickname)) {
      errors.nickname = true;
      isValid = false;
    }
    if (!form.validateEmail(this.state.email)) {
      errors.email = true;
      isValid = false;
    }
    if (!form.validateNotEmpty(this.state.recommend)) {
      errors.recommend = true;
      isValid = false;
    }
    // Validate characteristics
    if (
      !this.props.charNames.reduce((acc, charName) => {
        let isValidChar = form.validateNotEmpty(this.state[charName]);
        if (!isValidChar) {
          errors[charName] = true;
        }
        return isValidChar && acc;
      }, true)
    ) {
      isValid = false;
    }
    this.setState({ errors, isValid });
    return isValid;
  }

  handleCloseModal () {
    let resetState = {
      'Size': undefined,
      'Width': undefined,
      'Comfort': undefined,
      'Quality': undefined,
      'Length': undefined,
      'Fit': undefined,
    };
    Object.assign(resetState, INITIAL_STATE);
    this.props.closeModal();
    this.setState(resetState);
  }

  render() {
    let charCountCol = this.state.body.length < 51 ? 'red' : 'inherit';
    return (
      <Modal
        style={modalStyles}
        isOpen={this.props.showModal}
        id="add-review-modal"
        onRequestClose={this.handleCloseModal}
        shouldCloseOnOverlayClick={true}
        shouldCloseOnEsc={true}
        parentSelector={() => document.querySelector('.list-footer')}
      >
        <div className="modal-controls">
          <button className="close-modal-btn" onClick={this.handleCloseModal}>
            X
          </button>
          <div>
            <h2>Write Your Review</h2>
            <h3>{'About ' + this.props.productName}</h3>
          </div>
        </div>
        {this.state.submitText === null ? (
          <form id="add-review-form">
            <div id="rating-input">
              <ReviewStars
                isNotValid={!!this.state.errors.rating}
                currentValue={this.state.rating}
                handleInputChange={this.handleInputChange}
              />
            </div>

            <div id="recommend-input">
              <h4
                style={
                  this.state.errors.recommend === true
                    ? { color: 'red' }
                    : { color: 'inherit' }
                }
              >
                Would you recommend this product?
              </h4>
              <label>
                <input
                  type="radio"
                  name="recommend"
                  value={'true'}
                  checked={this.state.recommend === 'true'}
                  onChange={this.handleInputChange}
                />
                Yes
              </label>
              <label>
                <input
                  type="radio"
                  name="recommend"
                  value={'false'}
                  checked={this.state.recommend === 'false'}
                  onChange={this.handleInputChange}
                />
                No
              </label>
            </div>

            <div id="characteristics-input">
              {this.props.charNames.map((characteristic) => {
                return (
                  <RateCharacteristic
                    isNotValid={!!this.state.errors[characteristic]}
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
                <h4 style={this.state.errors.body ? { color: 'red' } : {}}>
                  Review Body
                </h4>
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
                <h4 style={this.state.errors.nickname ? { color: 'red' } : {}}>
                  Nickname
                </h4>
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
                <h4 style={this.state.errors.email ? { color: 'red' } : {}}>
                  Email
                </h4>
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
              {this.state.isValid ? null : INVALID_MES}
              <button onClick={this.handleSubmit}>Submit Review</button>
            </div>
          </form>
        ) : (
          <h3 style={{ textAlign: 'center' }}>{this.state.submitText}</h3>
        )}
      </Modal>
    );
  }
}

export default AddReviewModal;
