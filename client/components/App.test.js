// This is just a simple example test file that can be modified later or deleted.

import React from 'react'; // Test files must import react
import Adapter from 'enzyme-adapter-react-16';
import {shallow, configure} from 'enzyme'; // import any functions you are using from enzyme
import App from './App.jsx'; // import what ever component you are testing.

configure({adapter: new Adapter()});

test('should render with text "Hello, World"', () => {
  // Render a app with label in the document
  const app = shallow(<App />);

  expect(app.text()).toEqual('Hello, World!');

});
