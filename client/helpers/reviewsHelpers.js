'use strict';
import axios from 'axios';

const urlPrefix = '/api/fec2/hrnyc/reviews';

export const DEFAULT_STATE = {
  page: 1,
  count: 5,
  numToDisplay: 2,
  sortOrder: 'relevant',
  reviewFilters: {
    1: false,
    2: false,
    3: false,
    4: false,
    5: false,
    count: 0,
  },
  showMoreReviewsButton: true,
  allReviewsFetched: false,
};

export const calculateReviewAverage = (ratings) => {
  let totalStars = 0;
  let totalVotes = 0;
  for (let rating in ratings) {
    totalStars += parseInt(rating) * parseInt(ratings[rating]);
    totalVotes += parseInt(ratings[rating]);
  }
  return (totalStars / totalVotes).toFixed(2);
};

export const sumReviewCount = (ratings) => {
  return Object.values(ratings).reduce((sum, num) => {
    return sum + parseInt(num);
  }, 0);
};

export const updateFilters = (filtersState, rating) => {
  let updatedFilters = Object.assign({}, filtersState);

  updatedFilters[rating] = !updatedFilters[rating];

  if (updatedFilters[rating]) {
    updatedFilters.count += 1;
  } else {
    updatedFilters.count -= 1;
  }

  // If all filter toggles are on reset to all filters off
  if (updatedFilters.count === 5) {
    updatedFilters = {
      1: false,
      2: false,
      3: false,
      4: false,
      5: false,
      count: 0,
    };
  }

  return updatedFilters;
};

export const filterReviews = (reviews, filters) => {
  if (filters.count > 0) {
    reviews = reviews.filter((review) => {
      return filters[review.rating];
    });
  }
  return reviews;
};

export const api = {
  reviewHelpful(reviewId) {
    return axios.put(`${urlPrefix}/${reviewId}/helpful`).catch((err) => {
      console.error(err);
    });
  },

  getReviews(productId, page = 1, sort = DEFAULT_STATE.sortOrder) {
    let requestURL = `${urlPrefix}/?product_id=${productId}&page=${page}&sort=${sort}&count=5`;

    return axios
      .get(requestURL)
      .then(({ data }) => {
        return data.results;
      })
      .catch((err) => {
        console.error(err);
      });
  },

  reviewReport(reviewId) {
    return axios.put(`${urlPrefix}/${reviewId}/report`).catch((err) => {
      console.error(err);
    });
  },
};
