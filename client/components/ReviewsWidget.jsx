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
  },
  showMoreReviewsButton: true,
  allReviewsFetched: false,
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
      showMoreReviewsButton: stateDefaults.showMoreReviewsButton,
      allReviewsFetched: stateDefaults.allReviewsFetched,
    };

    //todo: Dont forget to bind them functions buddy
    this.toggleRatingFilter = this.toggleRatingFilter.bind(this);
    this.handleSortChange = this.handleSortChange.bind(this);
    this.handleMoreReviewsClick = this.handleMoreReviewsClick.bind(this);
    this.markReviewHelpful = this.markReviewHelpful.bind(this);
    this.reportReview = this.reportReview.bind(this);
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.props.productId !== prevProps.productId) {

      this.updateReviewList(
        stateDefaults.page,
        stateDefaults.numToDisplay,
        [],
        stateDefaults.allReviewsFetched,
        stateDefaults.sortOrder
      );

    }

    if (this.state.sortOrder !== prevState.sortOrder) {
      this.updateReviewList();
    }

    if (prevState.reviewFilters !== this.state.reviewFilters) {
      this.updateReviewList();
    }

    if (prevState.numToDisplay !== this.state.numToDisplay) {
      this.updateReviewList();
    }
  }

  // Input: page
  // Output: promise that resolves to array of reviews
  getReviews(page = 1, sort = this.state.sortOrder) {
    let requestURL = `/api/fec2/hrnyc/reviews/?product_id=${this.props.productId}&page=${page}&sort=${sort}&count=5`;

    return axios.get(requestURL)
      .then(({ data }) => {
        return data.results;
      })
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
  async updateReviewList(page, numToDisplay, productReviews, allReviewsFetched, sortOrder) {
    productReviews = productReviews || this.state.productReviews;
    page = page || this.state.page;
    numToDisplay = numToDisplay || this.state.numToDisplay;
    sortOrder = sortOrder || this.state.sortOrder;
    allReviewsFetched = allReviewsFetched !== undefined ? allReviewsFetched : this.state.allReviewsFetched;

    // Apply filters to reviewstore (they may have changed)
    let filteredReviews = this.filterReviews(productReviews);

    // While there are not enough reviews to display
    while (filteredReviews.length < numToDisplay && !allReviewsFetched) {
      // Get some more reviews
      let newReviews = await this.getReviews(page, sortOrder);
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
      filteredReviews = this.filterReviews(productReviews);

    }

    // Test if we should hide the More Reviews button
    let showMoreReviewsButton = filteredReviews.length <= numToDisplay && allReviewsFetched ? false : true;

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
    this.setState({numToDisplay})
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
    // Resets relevant parts of state to reset the review list view
    // based off of the newly selected sort
    let sortOrder = event.target.value;
    let page = stateDefaults.page;
    let numToDisplay = stateDefaults.numToDisplay;
    let productReviews = [];
    let allReviewsFetched = stateDefaults.allReviewsFetched;
    this.setState({ sortOrder, page, numToDisplay, productReviews, allReviewsFetched });
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

      this.apiMarkHelpful(reviewId)
      .then(()=>{
      // Update hepfulness number in local filtered review list
      let filteredReviews = this.state.filteredReviews.slice();
      let review = filteredReviews[index];
      review.helpfulness += 1;
      review = Object.assign({}, review); // Copy so React knows it changed
      filteredReviews[index] = review;

      localStorage.setItem(prefix + reviewId, true);
      this.setState({
        filteredReviews
      })
    })
    .catch((err) => {
      console.error(err);
    })
  }
}

  apiMarkHelpful(reviewId) {
    return axios.put(`/api/fec2/hrnyc/reviews/${reviewId}/helpful`)
    .catch((err) => {
      console.error(err);
    });
  }


  /******************************
   * ===== REPORT REVIEW ====== *
  ******************************/

  reportReview(reviewId, index) {

    this.apiReportReview(reviewId)
      .then(()=>{
      // Update review with reported parameter
      let filteredReviews = this.state.filteredReviews.slice();
      let review = filteredReviews[index];
      review.report = true;
      review = Object.assign({}, review); // Copy so React knows it changed
      filteredReviews[index] = review;

      this.setState({
        filteredReviews
      })
    })
    .catch((err) => {
      console.error(err);
    })


  }

  apiReportReview(reviewId) {
    return axios.put(`/api/fec2/hrnyc/reviews/${reviewId}/report`)
    .catch((err) => {
      console.error(err);
    });
  }

  render() {
    return (
      <div className="reviews-widget widget">
        <a name="anchor"><h3>{'Ratings & Reviews'}</h3></a>
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
            handleMoreReviewsClick={this.handleMoreReviewsClick}
            showMoreReviewsButton={this.state.showMoreReviewsButton}
            markReviewHelpful={this.markReviewHelpful}
            reportReview={this.reportReview}
          />
        </div>
      </div>
    );
  }
}

export default ReviewsWidget;
