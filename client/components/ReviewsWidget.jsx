import React, { Component } from 'react';
import RatingBreakdown from './reviewWidget/RatingBreakdown';
import ReviewList from './reviewWidget/ReviewList';
import axios from 'axios';

const stateDefaults = {
  page: 1,
  count: 5,
  numToDisplay: 2,
  sortOrder: 'relevant',
  reviewFilters: {
    '1': false,
    '2': false,
    '3': false,
    '4': false,
    '5': false,
    count: 0,
  }
};

// Good product id for tests: 11975
export class ReviewsWidget extends Component {
  constructor(props) {
    super(props);
    this.state = {
      filteredReviews: [],
      productReviews: [],
      page: stateDefaults.page,
      count: stateDefaults.count,
      numToDisplay: stateDefaults.numToDisplay,
      sortOrder: stateDefaults.sortOrder,
      reviewFilters: stateDefaults.reviewFilters,
    };

    //todo: Dont forget to bind them functions buddy
    this.toggleRatingFilter = this.toggleRatingFilter.bind(this);
    this.handleSortChange = this.handleSortChange.bind(this);
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.props.productId !== prevProps.productId) {
      this.updateReviewList(
        stateDefaults.page,
        stateDefaults.numToDisplay,
        []
      );
    }

    if (this.state.sortOrder !== prevState.sortOrder) {
      this.updateReviewList();
    }

    if (prevState.reviewFilters !== this.state.reviewFilters) {
      this.updateReviewList();
    }
  }

  // Input: page
  // Output: promise that resolves to array of reviews
  getReviews(page = 1) {
    let requestURL = `/api/fec2/hrnyc/reviews/?product_id=${this.props.productId}&page=${page}&sort=${this.state.sortOrder}&count=5`;

    return axios.get(requestURL)
      .then(({ data }) => {
        return data.results;
      })
      // ? is this the right place to error handle?
      .catch(err => {
        console.error(err);
      });
  }

  /** ----- updateReviewList -------
   * This function handles updating what reviews are visible
   * based on user interaction.
   *
   * Uses async/await to allow for a while loop that will fetch
   * more reviews if after filtering the reviews there are not
   * as many reviews to display as the user would like.
   *
   * The input parameters are all optional but are used as a way
   * to hard reset the review list. This was implemented mainly
   * for use when the product id changes to avoid setting the
   * state then immedietly rellying on those values to update
   * the reviews.
   **/
  async updateReviewList(page, numToDisplay, productReviews) {
    productReviews = productReviews || this.state.productReviews;
    page = page || this.state.page;
    numToDisplay = numToDisplay || this.state.numToDisplay;

    // Apply filters to reviewstore (they may have changed)
    let filteredReviews = this.filterReviews(productReviews);

    // While there are not enough reviews to display
    while (filteredReviews.length < numToDisplay) {
      // Get some more reviews
      // todo: add a try catch block?
      let newReviews = await this.getReviews((page));
      page += 1;

      // Exit loop if there are no more reviews from API
      if (newReviews.length === 0) {
        break;
        // todo: Is this a good place to make the 'Add Review' button dissapear?
        // todo: Does anything else have to happen here?
      }
      // Add the new reviews to review storage
      productReviews = [...productReviews, ...newReviews];
      // Filter all the reviews
      filteredReviews = this.filterReviews(productReviews);
    }
    // Update the state
    this.setState({
      filteredReviews,
      productReviews,
      page,
      numToDisplay,
    });
  }

  /*************************
   * ===== FILTERING ===== *
  *************************/

  filterReviews(reviews) {
    // If there are filters toggled to true
    if (this.state.reviewFilters.count > 0) {
      reviews = reviews.filter((review) => {
        return this.state.reviewFilters[review.rating];
      });
    }
    return reviews;
  }

  toggleRatingFilter(rating) {
    let newState = Object.assign({}, this.state.reviewFilters);

    newState[rating] = !newState[rating];

    if (newState[rating]) {
      newState.count += 1;
    } else {
      newState.count -= 1;
    }

    // If all filter toggles are on reset to all filters off
    if (newState.count === 5) {
      newState = {
        '1': false,
        '2': false,
        '3': false,
        '4': false,
        '5': false,
        count: 0,
      };
    }
    this.setState({
      reviewFilters: newState
    });
  }

  /*************************
   * ===== SORTING ======= *
  *************************/

  handleSortChange(event) {
    let sortOrder = event.target.value;
    let page = stateDefaults.page;
    let numToDisplay = stateDefaults.numToDisplay;
    let productReviews = [];
    this.setState({ sortOrder, page, numToDisplay, productReviews });
  }

  render() {
    return (
      <div className="reviews-widget">
        <h3>{'Ratings & Reviews'}</h3>
        <div className="reviews-container">
          <RatingBreakdown
            reviewMetaData={this.props.reviewMetaData}
            reviewAverage={this.props.reviewAverage}
            reviewCount={this.props.reviewCount}
            toggleRatingFilter = {this.toggleRatingFilter}
          />
          <ReviewList
            reviews={
              this.state.filteredReviews
              .slice(0, this.state.numToDisplay)
            }
            reviewCount={this.props.reviewCount}
            sortOrder={this.state.sortOrder}
            handleSortChange={this.handleSortChange}
          />
        </div>
      </div>
    );
  }
}

export default ReviewsWidget;
