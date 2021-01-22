import React from 'react'; // Test files must import react
import { shallow } from 'enzyme'; // import any functions you are using from enzyme
import ReviewSummary from '../breakdownComponents/ReviewsSummary';
import ReviewBar from '../breakdownComponents/ReviewBar';
import CharacteristicScale from '../breakdownComponents/CharacteristicScale';

describe('ReviewSummary', () => {
  let component;
  beforeAll(() => {
    let testProps = {
      reviewAverage: 3.50,
      recommended: {
        false: '2',
        true: '7',
      },
      reviewCount: 9,
    };

    component = shallow(<ReviewSummary {...testProps}/>);
  });

  afterAll(() => {
    component.unMount();
  });

  test('should display reviewAverage with 1 decimal place', () => {
    let renderedAverage = component.find('.review-average').render()[0].children[0].data;
    expect(renderedAverage).toEqual('3.5');
  });

});

describe('ReviewBar', () => {

})

