import React, { Component } from 'react';
import RatingBreakdown from './reviewWidget/RatingBreakdown';
import ReviewList from './reviewWidget/ReviewList';
import axios from 'axios';

export class ReviewsWidget extends Component {
  constructor(props) {
    super(props);
    this.state = {
      filteredReviews: [],
      productReviews: [],
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
    };

    //todo: Dont forget to bind them functions buddy
    this.toggleRatingFilter = this.toggleRatingFilter.bind(this);
    this.handleSortChange = this.handleSortChange.bind(this);
  }

  // ? Do I actually need this?
  componentDidMount() {}

  componentDidUpdate(prevProps, prevState) {
    // Temporarily just getting that data in
    if (this.props.productId !== prevProps.productId) {
      this.getReviews()
        .then((reviews) => {
          this.setState({
            productReviews: reviews,
            filteredReviews: reviews,
          });
        });
    }

    // If filters change re-filter the product reviews
    if (prevState.reviewFilters !== this.state.reviewFilters) {
      this.updateFilteredReviews();
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

  // todo: Make this function async/await
  updateReviewList() {
    let productReviews = this.state.productReviews;
    let page = this.state.page;
    let filteredReviews = this.state.filteredReviews;

    // while there are not enough reviews to display
    while (filteredReviews.length < this.state.numToDisplay) {
      // Get some more reviews
      let newReviews = this.getReviews((page += 1));
      // ** EXIT LOOP IF NO MORE REVIEWS **
      if (newReviews.length === 0) {
        break;
        // todo: Is this a good place to make the 'Add Review' button dissapear?
        // todo: Does anything else have to happen here?
      }
      // add reviews to reivew store
      productReviews = [...productReviews, ...newReviews];
      // filter reviews store
      filteredReviews = this.filterReviews(productReviews);
    }
    // update the state
    this.setState({
      filteredReviews,
      productReviews,
      page,
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

  updateFilteredReviews() {
    let reviews = this.state.productReviews;
    let filteredReviews = this.filterReviews(reviews);
    this.setState({
      filteredReviews
    });
  }

  /*************************
   * ===== SORTING ======= *
  *************************/

  handleSortChange(event) {
    let sortOrder = event.target.value;
    this.setState({ sortOrder });
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
