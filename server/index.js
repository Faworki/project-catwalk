const express = require('express');
const path = require('path');
const proxy = require('express-http-proxy');
const API_TOKEN = process.env.API_TOKEN || require('./config')['API_TOKEN'];

const app = express();
const PORT = process.env.PORT || 3000;
const ATELIER_HOST = 'https://app-hrsei-api.herokuapp.com';

const proxyOptions = {
  proxyReqOptDecorator: (proxyReqOpts, srcReq) => {
    proxyReqOpts.headers['Authorization'] = API_TOKEN;
    return proxyReqOpts
  }
};

app.use(express.static(path.join(__dirname, '../public')));
app.use('/', proxy(ATELIER_HOST, proxyOptions));

app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
})
