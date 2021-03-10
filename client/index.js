import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App.jsx';
import '../public/styles.scss';
import { BrowserRouter } from 'react-router-dom';

ReactDOM.render(<BrowserRouter><App /></BrowserRouter>, document.getElementById('app'));
