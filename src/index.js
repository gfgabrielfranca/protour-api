const express = require('express');
const mongoose = require('mongoose');

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(require('./routes'));

mongoose.connect(process.env.MONGO_URL, {
  useNewUrlParser: true,
});

app.listen(3333);
