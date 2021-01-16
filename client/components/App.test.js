// This is just a simple example test file that can be modified later or deleted.

import React from 'react'; // Test files must import react
import {shallow} from 'enzyme'; // import any functions you are using from enzyme
import App from './App.jsx'; // import what ever component you are testing.
import ReviewsWidget from './ReviewsWidget.jsx';
import Overview from './Overview';
import QnAs from './QnAs';
import RelatedProducts from './RelatedProducts';

describe('App should render ', () => {
  let app;
  beforeAll(() => {
    app = shallow(<App />, {disableLifecycleMethods: true});
  });

  afterAll(() => {
    app.unMount();
  });

  test('the Overview Widget', () => {
    expect(app.containsAnyMatchingElements([Overview])).toEqual(true);
  });

  test('the Related Products Widget', () => {
    expect(app.containsAnyMatchingElements([RelatedProducts])).toEqual(true);
  });

  test('the Questions & Answers Widget', () => {
    expect(app.containsAnyMatchingElements([QnAs])).toEqual(true);
  });

  test('the Reviews Widget', () => {
    expect(app.containsAnyMatchingElements([ReviewsWidget])).toEqual(true);
  });

});
