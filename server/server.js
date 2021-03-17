'use strict';
const express = require('express');
const path = require('path');
const proxy = require('express-http-proxy');
const API_TOKEN = process.env.API_TOKEN || require('./config')['API_TOKEN'];

const app = express();
const ATELIER_HOST = 'https://app-hrsei-api.herokuapp.com';

const proxyOptions = {
  proxyReqOptDecorator: (proxyReqOpts, srcReq) => {
    proxyReqOpts.headers['Authorization'] = API_TOKEN;
    return proxyReqOpts;
  },
  proxyReqPathResolver: (req) => {
    let url = req.url;
    return '/api' + url;
  }
};

app.use(express.static(path.join(__dirname, '../public')));
app.use('/api', proxy(ATELIER_HOST, proxyOptions));
app.use((req, res, next) => { // Catch all route that returns react app
  res.sendFile(path.join(__dirname, '..', 'public', 'index.html'));
});

module.exports = app;