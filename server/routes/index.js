const express = require('express');
const app = express();

app.use(require('./sensors'));
app.use(require('./referenceValues'));

module.exports = app;