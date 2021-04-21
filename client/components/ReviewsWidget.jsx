import React, { Component } from 'react';
import RatingBreakdown from './reviewWidget/RatingBreakdown';
import ReviewList from './reviewWidget/ReviewList';
import {
  DEFAULT_STATE,
  api,
  updateFilters,
  filterReviews,
} from '../helpers/reviewsHelpers';

// Good product id for tests: 11975
export class ReviewsWidget extends Component {
  constructor(props) {
    super(props);
    this.state = {
      filteredReviews: [],
      productReviews: [],
      page: DEFAULT_STATE.page,
      count: DEFAULT_STATE.count,
      numToDisplay: DEFAULT_STATE.numToDisplay,
      sortOrder: DEFAULT_STATE.sortOrder,
      reviewFilters: DEFAULT_STATE.reviewFilters,
      showMoreReviewsButton: DEFAULT_STATE.showMoreReviewsButton,
      allReviewsFetched: DEFAULT_STATE.allReviewsFetched,
    };

    this.toggleRatingFilter = this.toggleRatingFilter.bind(this);
    this.handleSortChange = this.handleSortChange.bind(this);
    this.handleMoreReviewsClick = this.handleMoreReviewsClick.bind(this);
    this.markReviewHelpful = this.markReviewHelpful.bind(this);
    this.reportReview = this.reportReview.bind(this);
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.props.productId !== prevProps.productId) {
      // If the productId changes some parameters need to be reset to their defaults
      this.updateReviewList(
        DEFAULT_STATE.page,
        DEFAULT_STATE.numToDisplay,
        [],
        DEFAULT_STATE.allReviewsFetched,
        DEFAULT_STATE.sortOrder
      );
    }
    if (
      this.state.sortOrder !== prevState.sortOrder ||
      prevState.reviewFilters !== this.state.reviewFilters ||
      prevState.numToDisplay !== this.state.numToDisplay
    ) {
      this.updateReviewList();
    }
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
   * state then immediately relying on those values to update
   * the reviews.
   **/
  async updateReviewList(
    page,
    numToDisplay,
    productReviews,
    allReviewsFetched,
    sortOrder
  ) {
    productReviews = productReviews || this.state.productReviews;
    page = page || this.state.page;
    numToDisplay = numToDisplay || this.state.numToDisplay;
    sortOrder = sortOrder || this.state.sortOrder;
    allReviewsFetched =
      allReviewsFetched !== undefined
        ? allReviewsFetched
        : this.state.allReviewsFetched;

    // Apply filters to reviewstore (they may have changed)
    let filteredReviews = filterReviews(
      productReviews,
      this.state.reviewFilters
    );

    // While there are not enough reviews to display
    while (filteredReviews.length < numToDisplay && !allReviewsFetched) {
      // Get some more reviews
      let newReviews = await api.getReviews(
        this.props.productId,
        page,
        sortOrder
      );
      page += 1;

      // Exit loop if there are no more reviews from API
      if (newReviews.length < this.state.count) {
        allReviewsFetched = true;
        if (newReviews.length === 0) {
          break;
        }
      }

      // Add the new reviews to review storage
      productReviews = [...productReviews, ...newReviews];
      // Filter all the reviews
      filteredReviews = filterReviews(productReviews, this.state.reviewFilters);
    }

    // Test if we should hide the More Reviews button
    let showMoreReviewsButton =
      filteredReviews.length <= numToDisplay && allReviewsFetched
        ? false
        : true;

    // Update the state
    this.setState({
      filteredReviews,
      productReviews,
      page,
      numToDisplay,
      showMoreReviewsButton,
      allReviewsFetched,
      sortOrder,
    });
  }

  /*************************
   * ==== MORE REVIEWS ===== *
   *************************/

  handleMoreReviewsClick(event) {
    let numToDisplay = this.state.numToDisplay + 2;
    this.setState({ numToDisplay });
  }

  /*************************
   * ===== FILTERING ===== *
   *************************/

  // Rating can be number 1-5 corresponding to the star ratings or
  // rating can be 'reset' which will reset filters back to the
  // default state
  toggleRatingFilter(rating) {
    let newState;
    if (rating === 'reset') {
      newState = DEFAULT_STATE.reviewFilters;
    } else {
      newState = updateFilters(this.state.reviewFilters, rating);
    }
    this.setState({
      reviewFilters: newState,
    });
  }

  /*************************
   * ===== SORTING ======= *
   *************************/

  handleSortChange(event) {
    // Resets relevant parts of state to reset the review list view
    // based off of the newly selected sort
    let sortOrder = event.target.value;
    let page = DEFAULT_STATE.page;
    let numToDisplay = DEFAULT_STATE.numToDisplay;
    let productReviews = [];
    let allReviewsFetched = DEFAULT_STATE.allReviewsFetched;
    this.setState({
      sortOrder,
      page,
      numToDisplay,
      productReviews,
      allReviewsFetched,
    });
  }

  /******************************
   * ===== MARK HELPFUL ======= *
   ******************************/

  markReviewHelpful(reviewId, index) {
    let prefix = 'review';

    // Check browser storage to see if this user has marked this
    // review as helpful before.
    let reviewsMarked = localStorage.getItem(prefix + reviewId);

    // If they have not previously marked this review
    if (!reviewsMarked) {
      api
        .reviewHelpful(reviewId)
        .then(() => {
          // Update hepfulness number in local filtered review list
          let filteredReviews = this.state.filteredReviews.slice();
          let review = filteredReviews[index];
          review.helpfulness += 1;
          review = Object.assign({}, review); // Copy so React knows it changed
          filteredReviews[index] = review;

          localStorage.setItem(prefix + reviewId, true);
          this.setState({
            filteredReviews,
          });
        })
        .catch((err) => {
          console.error(err);
        });
    }
  }

  /******************************
   * ===== REPORT REVIEW ====== *
   ******************************/

  reportReview(reviewId, index) {
    api
      .reviewReport(reviewId)
      .then(() => {
        // Update review with reported parameter
        let filteredReviews = this.state.filteredReviews.slice();
        let review = filteredReviews[index];
        review.report = true;
        review = Object.assign({}, review); // Copy so React knows it changed
        filteredReviews[index] = review;

        this.setState({
          filteredReviews,
        });
      })
      .catch((err) => {
        console.error(err);
      });
  }

  render() {
    return (
      <div className="reviews-widget widget">
        <h3 id="anchor">{'Ratings & Reviews'}</h3>
        <div className="reviews-container">
          <RatingBreakdown
            reviewMetaData={this.props.reviewMetaData}
            reviewAverage={this.props.reviewAverage}
            reviewCount={this.props.reviewCount}
            toggleRatingFilter={this.toggleRatingFilter}
            reviewFilters={this.state.reviewFilters}
          />
          <ReviewList
            reviews={this.state.filteredReviews.slice(
              0,
              this.state.numToDisplay
            )}
            reviewCount={this.props.reviewCount}
            sortOrder={this.state.sortOrder}
            handleSortChange={this.handleSortChange}
            handleMoreReviewsClick={this.handleMoreReviewsClick}
            showMoreReviewsButton={this.state.showMoreReviewsButton}
            markReviewHelpful={this.markReviewHelpful}
            reportReview={this.reportReview}
            characteristics = {this.props.reviewMetaData.characteristics}
            productName={this.props.productName}
          />
        </div>
      </div>
    );
  }
}

export default ReviewsWidget;
