const express = require('express');
const path = require('path');

const app = express();

app.use(require('./routes'));

app.use(
  '/files',
  express.static(path.resolve(__dirname, '..', 'tmp', 'uploads')),
);

app.listen(process.env.PORT || 3333);
