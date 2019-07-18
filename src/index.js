const express = require('express');
const cors = require('cors');
const path = require('path');

const app = express();

app.use(cors());

app.use(express.json());

app.use(require('./routes'));

app.use('/files', express.static(path.resolve(__dirname, '..', 'tmp', 'uploads')));

app.listen(process.env.PORT || 3333);
