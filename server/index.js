const express = require('express');
const path = require('path');
const proxy = require('express-http-proxy');

const app = express();
const PORT = process.env.PORT || 3000;
const ATELIER_HOST = 'https://app-hrsei-api.herokuapp.com';
// const API_KEY;

app.use(express.static(path.join(__dirname, '../public')));
app.use('/', proxy(ATELIER_HOST));

app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
})
