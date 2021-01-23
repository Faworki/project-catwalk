import React from 'react'; // Test files must import react
import { shallow } from 'enzyme'; // import any functions you are using from enzyme
import ReviewSummary from '../breakdownComponents/ReviewsSummary';
import ReviewBar from '../breakdownComponents/ReviewBar';
import CharacteristicScale from '../breakdownComponents/CharacteristicScale';
import moduleName from '../breakdownComponents/CharacteristicsBreakdown';
import CharacteristicsBreakdown from '../breakdownComponents/CharacteristicsBreakdown';

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
    let renderedAverage = component.find('#review-average').render()[0].children[0].data;
    expect(renderedAverage).toEqual('3.5');
  });

});

describe('ReviewBar', () => {
  let component;
  beforeAll(() => {
    let testProps = {
      rating: 1,
      percentOfRatings: 75,
    };

    component = shallow(<ReviewBar {...testProps}/>);
  });

  afterAll(() => {
    component.unMount();
  });

  test('should render test "1 stars"', () => {
    let text = component.find('span').render()[0].children[0].data;
    expect(text).toEqual('1 stars');
  });


});

describe('Characteristic Breakdown', () => {
  let component;
  beforeAll(() => {
    let testProps = {
      characteristics: {
        'Fit': {
            'id': 40098,
            'value': '2.7777777777777778'
        },
        'Length': {
            'id': 40099,
            'value': '2.8888888888888889'
        },
        'Comfort': {
            'id': 40100,
            'value': '2.3333333333333333'
        },
        'Quality': {
            'id': 40101,
            'value': '3.2222222222222222'
        }
    },
    };

    component = shallow(<CharacteristicsBreakdown {...testProps}/>);
  });

  afterAll(() => {
    component.unMount();
  });

  test('should render 4 CharacteristicsScales', () => {
    let scalesNum = component.find('CharacteristicScale').length;
    expect(scalesNum).toEqual(4);
  });


});


