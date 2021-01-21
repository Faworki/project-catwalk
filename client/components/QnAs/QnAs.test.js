import React from 'react'; // Test files must import react
import { shallow } from 'enzyme'; // import any functions you are using from enzyme
// import { mount, shallow, render } from 'enzyme';
import QnAs from './QnAs.jsx';

var sampleProduct = {
  id: 11055,
  campus: 'hrnyc',
  name: 'Brendon Shoes',
  slogan: 'Non occaecati ad omnis eos dolore in voluptatibus.',
  description:
    'Architecto nam illum distinctio non. Itaque voluptate commodi accusamus dignissimos. Sunt aut similique nostrum aperiam. Deserunt omnis maiores quis. Tempora veritatis et similique et natus nam. Necessitatibus placeat ut.',
  category: 'Shoes'
};

describe('QnAs should ', () => {
  let app;
  beforeAll(() => {
    app = shallow(<QnAs product={sampleProduct} />, { disableLifecycleMethods: true });
  });

  afterAll(() => {
    app.unMount();
  });

  test('intialize state with all keys', () => {
    let productState = {
      searchTerm: '',
      visibleQsQuant: 2,
      allQsQuanity: null,
      showModal: false,
      showMoreQsBtn: true,
    };
    expect(app.state()).toEqual(expect.objectContaining(productState));
  });

  // test('intialize state with all reviewMetaData keys', () => {

  //   let reviewMetaData = {
  //       'product_id': null,
  //       ratings: {},
  //       recommended: {},
  //       characteristics: {},
  //     };

  //   expect(app.state().reviewMetaData).toEqual(expect.objectContaining(reviewMetaData));

  // });

  // test('render the Overview Widget', () => {
  //   expect(app.containsAnyMatchingElements([Overview])).toEqual(true);
  // });

  // test('render the Related Products Widget', () => {
  //   expect(app.containsAnyMatchingElements([RelatedProducts])).toEqual(true);
  // });

  // test('render the Questions & Answers Widget', () => {
  //   expect(app.containsAnyMatchingElements([QnAs])).toEqual(true);
  // });

  // test('render the Reviews Widget', () => {
  //   expect(app.containsAnyMatchingElements([ReviewsWidget])).toEqual(true);
  // });
});
