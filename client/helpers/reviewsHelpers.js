'use strict';

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
