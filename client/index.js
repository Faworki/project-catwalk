import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App.jsx';
import '../public/styles.scss';
import { BrowserRouter, Switch, Route } from 'react-router-dom';

ReactDOM.render(
  <BrowserRouter forceRefresh={true}>
    <Switch>
      <Route path="/p/:productId" component={App} />
      <Route path="/" component={App} />
    </Switch>
  </BrowserRouter>,
  document.getElementById('app')
);
