'use strict';
import axios from 'axios';

const urlPrefix = '/api/fec2/hrnyc/reviews';

export const DEFAULT_STATE = {
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

export const getReviews = (productId, page = 1, sort = DEFAULT_STATE.sortOrder) => {
  let requestURL = `${urlPrefix}/?product_id=${productId}&page=${page}&sort=${sort}&count=5`;

  return axios.get(requestURL)
    .then(({ data }) => {
      return data.results;
    })
    .catch(err => {
      console.error(err);
    });
};

export const api = {
  reviewHelpful(reviewId) {
    return axios.put(`${urlPrefix}/${reviewId}/helpful`)
    .catch((err) => {
      console.error(err);
    });
  },

  getReviews(productId, page = 1, sort = DEFAULT_STATE.sortOrder) {
    let requestURL = `${urlPrefix}/?product_id=${productId}&page=${page}&sort=${sort}&count=5`;

    return axios.get(requestURL)
      .then(({ data }) => {
        return data.results;
      })
      .catch(err => {
        console.error(err);
      });
  }
};
