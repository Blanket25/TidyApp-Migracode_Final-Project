const PORT = 4000;
const bodyParser = require('body-parser');

const express = require('express');
const app = express();

const apiFunction = require('./api.js');
const api = apiFunction();

app.use(bodyParser.json());

app.listen(PORT, () => console.log(`app listening on port: ${PORT}`));