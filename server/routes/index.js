const express = require('express');
const app = express();

app.use(require('./sensors'));
app.use(require('./referenceValues'));
app.use(require('./users'));
app.use(require('./login'));
app.use(require('./actuators'));

module.exports = app;